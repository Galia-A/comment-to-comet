import fs from "fs/promises";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Course.module.css";
import chatStyles from "@/styles/Chat.module.css";
import logo from "../../public/logo.png";
import Image from "next/image";
import LP from "../../public/json/course.json";
// import Button from "@mui/material/Button";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useRadioGroup } from "@mui/material/RadioGroup";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormLabel from "@mui/material/FormLabel";
import { createTheme } from "@mui/material/styles";
import useStore from "@/utils/store";
import { signOut } from "firebase/auth";
import {
  getGroupFreeSpot,
  logOutFirebase,
  getGroupParticipants,
} from "../../utils/firebase";
import GroupChat from "../../components/GroupChat";
import ReadAloud from "../../components/ReadAloud";
import path from "path";
import {
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Input,
  Checkbox,
  FormControl,
  Button,
} from "@mui/material";
import { addUserDataB } from "@/utils/firebase";

type LessonPlan = typeof LP;
type People = LessonPlan[number]["lessons"][number]["fun_blocks"]["people"];
export type GroupFinalAnswer = { answers: number[]; variables: string[] }[];
export type SingleFinalAnswer = Record<string, number>[];

// Opening
const opening = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M"
) => {
  const openingData = lessonPlan[chapterId].lessons[lessonId].opening;
  const headline =
    gender == "F" ? openingData.headline_F : openingData.headline_M;
  const text = gender == "F" ? openingData.text_F : openingData.text_M;
  const signature = openingData.signature;
  return (
    <div>
      <div className={styles.openingHeadline}>
        <ReadAloud sndNumber={4} /> &nbsp;{headline}
      </div>
      <div className={styles.openingTxt}>{readJsonWithBreaks(text)}</div>
      <div>{readJsonWithBreaks(signature)}</div>
    </div>
  );
};

// Space concept text - reading from JSON//
const concepts = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M"
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const headers = lesson.space_concepts_headers;
  const concepts = lesson[`space_concepts_${gender}`];

  return headers.map((header, i) => (
    <div className={styles.spaceConceptsSingle}>
      <div className={styles.spaceConceptsHeader}>
        <ReadAloud sndNumber={5 + i} /> &nbsp;{header}
      </div>
      <div className={styles.spaceConceptsDetailed}>{concepts[i]}</div>
    </div>
  ));
};
// space concepts - images - reading from JSON//
const conceptsImgs = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const images = lesson.concept_images;

  return images.map((imgSrc, i) => (
    <Image
      className={styles.spaceConceptImg}
      width={150}
      height={150}
      alt={lesson.concept_images_alt[i]}
      src={imgSrc}
    />
  ));
};

// space - questions - reading from JSON //
const getQuestionsAndAnswers = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  values: string[],
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];

  return lesson.questions.map((q, j) => {
    const innerDivs = q.answers.map((a, i) => (
      <div className={styles.answerSingle}>
        <FormControlLabel
          value={`${j}:${i}`}
          control={<Radio sx={{ color: "white" }} />}
          label={a}
        />
      </div>
    ));
    return (
      <div className={styles.questionsAll}>
        <FormLabel
          id={q.id}
          className={styles.questionSingle}
          sx={{ color: "#F7EFFF", fontSize: 20, m: 3, lineHeight: 3 }}
        >
          {q.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name={`name_${j}`}
          value={values[j]}
          onChange={handleRadioChange}
          sx={{ color: "#F7EFFF" }}
        >
          {innerDivs}
        </RadioGroup>
      </div>
    );
  });
};

// Space FUN - Riddle - reading from JSON//
const getFunRiddle = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M",
  answer: boolean,
  handleRiddleAnswer: React.MouseEventHandler
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  //console.dir(lesson);
  const riddle = lesson.fun_blocks.riddle;

  return (
    <div className={styles.funItem}>
      <div className={styles.funItemTitle}> {riddle.title} </div>
      <div className={styles.funItemText}> {riddle.text} </div>
      {answer ? (
        <>
          <div className={styles.riddleAnswer}> {riddle.answer}</div>
          <div className={styles.toggleAnswer} onClick={handleRiddleAnswer}>
            {gender === "F" ? "לחצי להסתרת התשובה" : "לחץ להסתרת התשובה"}
          </div>
        </>
      ) : (
        <div className={styles.toggleAnswer} onClick={handleRiddleAnswer}>
          {gender === "F" ? "לחצי לגילוי התשובה" : "לחץ לגילוי התשובה"}
        </div>
      )}
    </div>
  );
};
// Space FUN - Did You Know - reading from JSON//
const getFunDyk = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M"
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const dyk = lesson.fun_blocks.dyk;

  return (
    <div className={styles.funItem}>
      <div className={styles.funItemTitle}> {dyk.title} </div>
      <div className={styles.funItemText}> {dyk.text} </div>
      {dyk.links.map((link, i) => (
        <Link className={styles.readMoreLink} href={link} target="_blank">
          {gender === "F" ? dyk.link_text_F[i] : dyk.link_text_M[i]}
        </Link>
      ))}
    </div>
  );
};
// Space FUN - Did You Know - reading from JSON//
const getFunDiy = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M"
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const diy = lesson.fun_blocks.diy;
  const text = gender === "F" ? "text_F" : "text_M";

  return (
    <div className={`${styles.funItem} ${styles.diyItem}`}>
      <div className={styles.funItemTitle}> {diy.title} </div>

      {diy[text].split("\n").map((txt, i) =>
        txt.length === 0 ? null : (
          <div className={styles.funItemText}>
            {txt}
            <br />

            {i === 1 ? <br /> : null}
          </div>
        )
      )}

      {diy.links.map((link, i) => (
        <Link className={styles.missionLink} href={link} target="_blank">
          <br />
          {gender === "F" ? diy.link_text_F[i] : diy.link_text_M[i]} <br />
        </Link>
      ))}
    </div>
  );
};
// Space FUN - PEOPLE - reading from JSON//
const getFunPeople = (gender: "F" | "M", person: People[number]) => {
  return (
    <div className={styles.funItem}>
      <div className={styles.funItemTitle}> {person.text.title} </div>
      <div className={styles.funItemText}>{person.text.text}</div>

      {person.links.map((link, i) => (
        <Link className={styles.missionLink} href={link} target="_blank">
          <br />
          {gender === "F" ? person.link_text_F[i] : person.link_text_M[i]}
          <br />
        </Link>
      ))}
    </div>
  );
};

// Code concept - text - reading from JSON//
const codeConcepts = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M"
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const headers = lesson.code_intro.code_concepts_headers;
  const concepts = lesson.code_intro[`code_concepts_${gender}`];

  return headers.map((header, i) => (
    <div className={styles.spaceConceptsSingle}>
      <div className={styles.spaceConceptsHeader}>
        {i > 0 && i < 4 ? (
          <span>
            <ReadAloud sndNumber={6 + i} /> &nbsp;
          </span>
        ) : null}
        {header}
      </div>
      <div className={styles.spaceConceptsDetailed}>{concepts[i]}</div>
    </div>
  ));
};
// Code concepts - images - reading from JSON//
const codeConceptsImgs = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const images = lesson.code_intro.concept_images;

  return images.map((imgSrc, i) => (
    <Image
      className={styles.spaceConceptImg}
      width={160}
      height={160}
      alt={lesson.code_intro.concept_images_alt[i]}
      src={imgSrc}
    />
  ));
};

// "code_practice" | "group_coding"//
const codeExercise = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M",
  questionType: "code_practice" | "group_coding",
  handleSnippetClicked: (
    questionNum: number,
    snippetNum: number
  ) => React.MouseEventHandler,
  userAnswer: number[][],
  setAnswerCheck: Dispatch<SetStateAction<boolean[][]>>,
  answerCheck: boolean[][],
  setUserAnswer: Dispatch<SetStateAction<number[][]>>,
  setVarsFromGroup: Dispatch<SetStateAction<string[][]>>,
  varsFromGroup: string[][],
  groupAnswerFeedbackToggle: boolean,
  setGroupAnswerFeedbackToggle: Dispatch<SetStateAction<boolean>>,
  singleAnswerFeedbackToggle: boolean,
  setSingleAnswerFeedbackToggle: Dispatch<SetStateAction<boolean>>,
  position: number,
  feedbackForProgramming: string[],
  setFeedbackForProgramming: Dispatch<SetStateAction<string[]>>,
  answersSingleExercise: number[][],
  setAnswersSingleExerxcise: Dispatch<SetStateAction<number[][]>>,
  answersGroupExercise: GroupFinalAnswer,
  setAnswersGroupExerxcise: Dispatch<SetStateAction<GroupFinalAnswer>>,
  answersPracticeAExercise: number[][],
  setAnswersPracticeAExerxcise: Dispatch<SetStateAction<number[][]>>,
  answersPracticeBExercise: number[][],
  setAnswersPracticeBExerxcise: Dispatch<SetStateAction<number[][]>>
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const exercises = lesson[questionType].exercises;
  const questionTypeNumber = questionType == "code_practice" ? 0 : 1;
  const groupQuestionIndex = 3;
  const readAloudIndex = questionType === "code_practice" ? 10 : 12;

  return exercises.map((exercise, exerciseIndex) =>
    questionType === "code_practice" ||
    (questionType === "group_coding" && exerciseIndex === position - 1) ||
    (questionType === "group_coding" &&
      exerciseIndex === groupQuestionIndex) ? (
      <div>
        <span className={styles.codeTitleDiveder}>
          <hr />
          <ReadAloud sndNumber={readAloudIndex + exerciseIndex} /> &nbsp;
          {exercise.title}
          <hr />
        </span>
        <div className={styles.codeQuestion}>{exercise.question}</div>
        <div className={styles.codeQuestionDetails}>
          {exercise[`question_details_${gender}`]}
        </div>

        <div className={styles.codeExerArea}>
          <div className={styles.codeSnippets}>
            {/* /////// SNIPPETS ////// */}
            {exercise.code_snippets.map((cs, g) => (
              <div className={styles.snippet}>
                {questionType === "group_coding" &&
                exerciseIndex === groupQuestionIndex &&
                g > exercise.code_snippets.length - 4 ? (
                  // Edit
                  <div>
                    <span className={"fa-solid fa-pencil"}>&nbsp;&nbsp;</span>{" "}
                    <span onClick={handleSnippetClicked(exerciseIndex, g)}>
                      {cs}
                    </span>
                    <span>
                      <Input
                        type="text"
                        value={
                          varsFromGroup[lessonId][
                            g - (exercise.code_snippets.length - 3)
                          ]
                        }
                        placeholder=""
                        style={{
                          marginRight: "30px",
                          width: "50px",
                          color: "#F7EFFF",
                          borderColor: "#F7EFFF",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          direction: "ltr",
                        }}
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                        onChange={(e) => {
                          handleGroupCodeChange(
                            e,
                            lessonId,
                            g - (exercise.code_snippets.length - 3),
                            setVarsFromGroup,
                            varsFromGroup
                          );
                        }}
                      />
                    </span>
                  </div>
                ) : (
                  // normal - without editing
                  <span
                    className={styles.editIcon}
                    onClick={handleSnippetClicked(exerciseIndex, g)}
                  >
                    {cs}
                  </span>
                )}

                {/* {`${styles.AgreeButton} ${styles.checkAnswersButton}`} */}
              </div>
            ))}
          </div>

          <span className={styles.codeAreaAndBtn}>
            <div
              id={`codingArea${exerciseIndex}`}
              className={styles.codingArea}
            >
              {userAnswer[exerciseIndex].map((ua, line) => (
                <>
                  {/* const correctAnswer = exercises */}
                  <div className={styles.codeBlock}>
                    <span className={styles.codeCheck}>
                      {/* toggle answer sign X || V appearance */}
                      {answerCheck[questionTypeNumber][exerciseIndex] ? (
                        checkCodeAnswers(
                          ua,
                          exercises[exerciseIndex].code_correct_answer[line]
                        )
                      ) : (
                        <></>
                      )}
                    </span>
                    {exercise.code_snippets[ua]}
                    {questionType === "group_coding" &&
                    exerciseIndex === groupQuestionIndex &&
                    ua > exercise.code_snippets.length - 4
                      ? varsFromGroup[lessonId][
                          ua - (exercise.code_snippets.length - 3)
                        ]
                      : ""}
                  </div>
                  <br />
                </>
              ))}
              {/* Single Feedback */}
              {questionType === "group_coding" &&
              exerciseIndex === position - 1 &&
              singleAnswerFeedbackToggle === true ? (
                <div className={styles.overlapFeedback}>
                  {feedbackForProgramming[0] === "correct" ? (
                    <p className={styles.overlapFeedbackTxt}>
                      כל הכבוד!
                      <br />
                      התשובה הסופית היא
                      {" " + exercise.full_answer}
                      <br />
                      {gender == "F"
                        ? "עכשיו את יכולה לשתף את התשובה בצ'אט עם שאר הצוות! "
                        : "עכשיו אתה יכול לשתף את התשובה בצ'אט עם שאר הצוות! "}
                    </p>
                  ) : (
                    <p className={styles.overlapWrongFeedbackTxt}>
                      <br />
                      {gender === "F"
                        ? "הקוד לא רץ כמתוכנן, אבל את בדרך הנכונה!"
                        : "הקוד לא רץ כמתוכנן, אבל אתה בדרך הנכונה!"}
                      <br />
                      <br />
                      <ul>
                        {gender === "F"
                          ? "שימי לב לנקודות הבאות:"
                          : "שים לב לנקודות הבאות"}
                        {feedbackForProgramming.map((txt, index) =>
                          index > 0 && index < 4 ? (
                            <li className={styles.listTxt}>{txt}</li>
                          ) : null
                        )}
                      </ul>
                    </p>
                  )}
                </div>
              ) : (
                <></>
              )}
              {/* Group Feedbak */}
              {questionType === "group_coding" &&
              exerciseIndex === groupQuestionIndex &&
              groupAnswerFeedbackToggle === true ? (
                <div className={styles.overlapFeedback}>
                  <p className={styles.overlapFeedbackTxt}>
                    התשובה שלך נשלחה למפקדה! <br />
                    ביכולתך לעדכן את התשובה ולשלוח אותה שוב בכל שלב.
                    <br />
                    {gender == "F" ? "אנא המשיכי לסיכום!" : "אנא המשך לסיכום!"}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <span className={styles.checkButtons}>
              <Button
                onClick={() => {
                  if (questionType === "code_practice") {
                    if (exerciseIndex === 0) {
                      answersPracticeAExercise.push(userAnswer[exerciseIndex]);
                    } else {
                      answersPracticeBExercise.push(userAnswer[exerciseIndex]);
                    }
                  }

                  setUserAnswer((x) => [
                    ...x.slice(0, exerciseIndex),
                    exercises[exerciseIndex].code_start_pos,
                    ...x.slice(exerciseIndex + 1),
                  ]);
                }}
                variant="outlined"
                className={`${styles.AgreeButton} ${styles.checkAnswersButton}`}
              >
                <span className={"fa-regular fa-trash-can"}> </span>&nbsp; מחיקה
              </Button>
              <Button
                onClick={() =>
                  setAnswerCheck((x) => [
                    ...x.slice(0, questionTypeNumber),
                    [
                      ...x[questionTypeNumber].slice(0, exerciseIndex),
                      !x[questionTypeNumber][exerciseIndex],
                      ...x[questionTypeNumber].slice(exerciseIndex + 1),
                    ],
                    ...x.slice(questionTypeNumber + 1),
                  ])
                }
                variant="outlined"
                className={`${styles.AgreeButton} ${styles.checkAnswersButton}`}
                disabled={questionType === "group_coding"}
              >
                <span className={"fa-solid fa-question"}> </span>&nbsp; בדיקה
              </Button>

              {questionType === "group_coding" &&
              exerciseIndex === groupQuestionIndex ? (
                // group exersice
                <Button
                  onClick={() => {
                    setGroupAnswerFeedbackToggle((x) => !x);
                    if (!groupAnswerFeedbackToggle)
                      answersGroupExercise.push({
                        answers: userAnswer[exerciseIndex],
                        variables: varsFromGroup[lessonId],
                      });
                  }}
                  variant="outlined"
                  className={`${styles.AgreeButton} ${styles.checkAnswersButton}`}
                >
                  {groupAnswerFeedbackToggle === false ? (
                    <span>
                      <span className={"fa-regular fa-paper-plane"}></span>
                      {"  "} זהו!
                    </span>
                  ) : (
                    <span>
                      <span className={"fa-regular fa-circle-xmark"}></span>
                      {"  "}
                      סגירה
                    </span>
                  )}
                </Button>
              ) : // Single exercise
              questionType === "group_coding" &&
                exerciseIndex === position - 1 ? (
                <Button
                  onClick={() => {
                    setFeedbackForProgramming(
                      checkAllAnswers(
                        userAnswer[exerciseIndex],
                        exercises[exerciseIndex].code_correct_answer
                      )
                    );
                    setSingleAnswerFeedbackToggle((x) => !x);
                    !singleAnswerFeedbackToggle
                      ? answersSingleExercise.push(userAnswer[exerciseIndex])
                      : null;
                  }}
                  variant="outlined"
                  className={`${styles.AgreeButton} ${styles.checkAnswersButton}`}
                >
                  {singleAnswerFeedbackToggle ? (
                    <span>
                      <span className={"fa-regular fa-circle-xmark"}></span>
                      {"   "}
                      סגירה
                    </span>
                  ) : (
                    <span>
                      <span className={"fa-regular fa-lightbulb"}></span>
                      {"   "} צדקתי?
                    </span>
                  )}
                </Button>
              ) : null}
            </span>
          </span>
        </div>
      </div>
    ) : null
  );
};

const checkCodeAnswers = (userAnswer: number, correctAnswer: number) => {
  return (
    <>
      {userAnswer == correctAnswer ? (
        <span className={styles.correctAnswer}>
          <i className={"fa-regular fa-circle-check"}></i>
        </span>
      ) : (
        <span className={styles.wrongAnswer}>
          <i className={"fa-regular fa-circle-xmark"}></i>
        </span>
      )}
    </>
  );
};

const checkAllAnswers = (
  answersToCheck: number[],
  correctAnswers: number[]
) => {
  //Recived in parameters:
  //userAnswer[exerciseIndex]
  // exercises[exerciseIndex].code_correct_answer
  const feedback = ["correct"];

  if (answersToCheck.length !== correctAnswers.length) {
    feedback[1] = "כמות הפקודות שבחרת אינה נכונה";
    feedback[0] = "wrong";
  } else {
    feedback[1] = "כמות הפקודות שבחרת נכונה";
  }

  if (!correctAnswers.every((x) => answersToCheck.includes(x))) {
    feedback[2] = "בחרת בפקודות שלא מתאימות לתוכנית";
    feedback[0] = "wrong";
  } else {
    feedback[2] = "הפקודות שבחרת נכונות, יתכן שהסדר שגוי";
  }

  for (let i = 0; i < answersToCheck.length; i++) {
    if (answersToCheck[i] !== correctAnswers[i]) {
      feedback.push("הפקודה בשורה " + (i + 1) + " אינה נכונה");
      feedback[0] = "wrong";
    }
  }

  return feedback;
};

const handleGroupCodeChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  lessonID: number,
  index: number,
  setVarsFromGroup: Dispatch<SetStateAction<string[][]>>,
  varsFromGroup: string[][]
): void => {
  setVarsFromGroup([
    ...varsFromGroup.slice(0, lessonID),
    [
      ...varsFromGroup[lessonID].slice(0, index),
      event.target.value,
      ...varsFromGroup[lessonID].slice(index + 1),
    ],
    ...varsFromGroup.slice(lessonID + 1),
  ]);
};
///// GROUP CODING - read text from JSON ///////

const readJsonWithBreaks = (text: string) => {
  return (
    <div>
      {text.split("\n").map((txt, i) =>
        txt.length === 0 ? null : (
          <div className={styles.funItemText}>
            {txt}
            <br />
            {i === 1 ? <br /> : null}
          </div>
        )
      )}
    </div>
  );
};
const getChatIcon = (gender: "F" | "M", position: number) => {
  const icons = {
    F: [
      "fa-solid fa-otter fa-flip-horizontal",
      "fa-solid fa-kiwi-bird fa-flip-horizontal",
      "fa-solid fa-horse fa-flip-horizontal",
    ], //Otter, Kiwi, Horse
    M: [
      "fa-solid fa-bolt-lightning",
      "fa-solid fa-snowflake",
      "fa-solid fa-moon",
    ], //Lightning, Snowflake, Moon
  };
  const userIcon = icons[gender][position - 1];
  return (
    <>
      {gender === "F"
        ? " (זו את! והנה האייקון שנבחר עבורך: "
        : " (זה אתה! והנה האייקון שנבחר עבורך: "}
      <span
        className={`${chatStyles.genderIcon} ${
          gender == "F" ? chatStyles.girlColor : chatStyles.boysColor
        }`}
      >
        <i className={userIcon}></i>
      </span>
      ){" "}
    </>
  );
};

////////////////////// Page content //////////////////////
/*
.########.....###.....######...########.####
.##.....##...##.##...##....##..##.......####
.##.....##..##...##..##........##...........
.########..##.....##.##...####.######...####
.##........#########.##....##..##.......####
.##........##.....##.##....##..##........##.
.##........##.....##..######...########.##..
*/
// /*
// ..######...#######..##....##.########.########.##....##.########
// .##....##.##.....##.###...##....##....##.......###...##....##...
// .##.......##.....##.####..##....##....##.......####..##....##...
// .##.......##.....##.##.##.##....##....######...##.##.##....##...
// .##.......##.....##.##..####....##....##.......##..####....##...
// .##....##.##.....##.##...###....##....##.......##...###....##...
// ..######...#######..##....##....##....########.##....##....##...
// */

export default function Course({ lessonPlan }: { lessonPlan: LessonPlan }) {
  const router = useRouter();
  const stateStore = useStore();

  const [page, setPage] = useState(0);
  const chapter_id = +router.query.id!;
  const [lesson_id, setLesson_id] = useState(0);
  const gender = stateStore.gender;
  const lesson = lessonPlan[chapter_id].lessons[lesson_id];
  const people = lesson.fun_blocks.people;

  // Checked log-in //
  useEffect(() => {
    // Check if user is logged in
    if (!stateStore.isLoggedIn) {
      router.push(`/`);
    }

    getGroupParticipants(stateStore.group).then(setGroupNames);
  }, [stateStore.isLoggedIn]);

  // LOG OUT //
  //const { logOut } = useStore();
  const handleLogout = () => {
    logOutFirebase();
    stateStore.logOut();
    // console.log("store atate logged in?", stateStore.isLoggedIn);
  };

  // space - questions - answering and feedback //
  const [answers, setAnswers] = useState(
    Array.from(lesson.questions, (_) => -1)
  );
  const [values, setValues] = useState(Array.from(lesson.questions, (_) => ""));
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const spaceAnswers = lessonPlan[chapter_id].lessons[lesson_id].questions.map(
    (q) => q.correct_answer
  );
  const [groupNames, setGroupNames] = useState<string[]>([]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [q, a] = event.target.value.split(":").map((x) => +x);
    answers[q] = a;
    setAnswers([...answers]);
    values[q] = `${q}:${a}`;
    setValues([...values]);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let text = "";
    setError(false);
    for (let i = 0; i < spaceAnswers.length; i++) {
      if (answers[i] !== spaceAnswers[i]) {
        text += `יש לך טעות בשאלה ${i + 1} `;
        text += `${gender === "F" ? "נסי שוב!" : "נסה שוב!"} \n`;
        setError(true);
      } else if (answers[i] === spaceAnswers[i]) {
        text += `כל הכבוד! ענית נכון על שאלה ${i + 1}! \n`;
      }
    }
    setHelperText(text);
  };

  const [riddleAnswer, setRiddleAnswer] = useState(false);
  const handleRiddleAnswer: React.MouseEventHandler = (_) => {
    setRiddleAnswer(!riddleAnswer);
  };

  // Code Area - Handle click
  const exercises = lessonPlan[1].lessons[lesson_id].code_practice.exercises;
  const groupExercises =
    lessonPlan[1].lessons[lesson_id].group_coding.exercises;

  //toggle feedback for answers screen on/off
  //Only used for practice code (not for the simulation exercises)
  const [answerCheck, setAnswerCheck] = useState<boolean[][]>([
    [false, false],
    [false, false],
  ]);

  const [snippetsToggle, setSnippetsToggle] = useState<boolean[][]>();

  const [varsFromGroup, setVarsFromGroup] = useState<string[][]>([
    ["?", "?", "?"], //lesson 1
    ["?", "?", "?"], //lesson 2
    ["?", "?", "?"],
    ["?", "?", "?"],
    ["?", "?", "?"],
  ]);

  const [userAnswer, setUserAnswer] = useState<number[][]>(
    exercises.map((e) => e.code_start_pos)
  );
  const [groupAnswer, setGroupAnswer] = useState<number[][]>(
    groupExercises.map((e) => e.code_start_pos)
  );
  const [groupAnswerFeedbackToggle, setGroupAnswerFeedbackToggle] =
    useState(false);
  const [singleAnswerFeedbackToggle, setSingleAnswerFeedbackToggle] =
    useState(false);

  //Saving code answers //
  const [answersPracticeAExerxcise, setAnswersPracticeAExerxcise] = useState<
    number[][]
  >([]);
  const [answersPracticeBExerxcise, setAnswersPracticeBExerxcise] = useState<
    number[][]
  >([]);
  const [answersSingleExerxcise, setAnswersSingleExerxcise] = useState<
    number[][]
  >([]);
  const [answersGroupExerxcise, setAnswersGroupExerxcise] =
    useState<GroupFinalAnswer>([]);
  /////////////

  const [feedbackForProgramming, setFeedbackForProgramming] = useState<
    string[]
  >([]);
  const handleSnippetClicked =
    (exerciseNum: number, snippetNum: number): React.MouseEventHandler =>
    (_) => {
      setUserAnswer([
        ...userAnswer.slice(0, exerciseNum),
        [...userAnswer[exerciseNum], snippetNum],
        ...userAnswer.slice(exerciseNum + 1),
      ]);

      const scrollElement = document.getElementById(
        `codingArea${exerciseNum}`
      )!;
      scrollElement.scroll({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    };

  const handleGroupSnippetClicked =
    (exerciseNum: number, snippetNum: number): React.MouseEventHandler =>
    (_) => {
      setGroupAnswer([
        ...groupAnswer.slice(0, exerciseNum),
        [...groupAnswer[exerciseNum], snippetNum],
        ...groupAnswer.slice(exerciseNum + 1),
      ]);
      const scrollElement = document.getElementById(
        `codingArea${exerciseNum}`
      )!;
      scrollElement.scroll({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    };

  function matrixToRecords<T>(xss: T[][]): Record<string, T>[] {
    return xss.map((xs) => {
      const res: Record<string, T> = {};
      for (const [k, v] of Object.entries(xs)) {
        res[k] = v;
      }
      return res;
    });
  }

  const changePageAndScroll = async (direction: number) => {
    stateStore.setCurrentSound(-1);
    let newPage = direction;

    //from practice to next page
    if (direction - 1 === 5) {
      answersPracticeAExerxcise.push(userAnswer[0]);
      answersPracticeBExerxcise.push(userAnswer[1]);
      stateStore.setPracticeAProgrammingAnswers(answersPracticeAExerxcise);
      stateStore.setPracticeBProgrammingAnswers(answersPracticeBExerxcise);
    }
    if (direction > 6) {
      //newPage = 0;

      stateStore.setSingleProgrammingAnswers(answersSingleExerxcise);
      stateStore.setGroupProgrammingAnswers(answersGroupExerxcise);

      try {
        const lessonData = {
          answersSingle: matrixToRecords(answersSingleExerxcise),
          answersGroup: answersGroupExerxcise,
          answersPracticeA: matrixToRecords(
            stateStore.practiceAProgrammingAnswers
          ),
          answersPracticeB: matrixToRecords(
            stateStore.practiceBProgrammingAnswers
          ),
          createdAt2: new Date(),
        };
        await addUserDataB(stateStore.uid!, {
          ...lessonData,
        });

        setTimeout(() => {
          router.push("/flying/thankyou");
        }, 200);
      } catch (error) {
        console.error(
          "Error Code:",
          (error as any).code,
          " : ",
          (error as any).message
        );
      }
      // router.push("/flying/thankyou");
    }

    if (direction < 0) {
      newPage = 6;
      lesson_id > 0 ? setLesson_id(lesson_id - 1) : null;
    }
    setPage(newPage);

    const scrollElement = document.getElementById("title")!;
    scrollElement.scrollIntoView();
  };
  //   console.dir(router.query);
  //   console.log(`page = ${page}`);

  return (
    <>
      <Head>
        <title>Comment To Comet</title>
      </Head>
      {/* Top Menu */}
      <div id="title" className={styles.topMenu}>
        <span className={styles.courseName}>
          <Image src={logo} alt="site logo" className={styles.topLogo} />
          <span className={styles.courseTitle}>
            <div style={{ fontSize: "x-large" }}>הרפתקה בחלל</div>
            פרק&nbsp;
            {chapter_id}:&nbsp;
            {lessonPlan[chapter_id][`chapter_name_${gender}`]}
          </span>
        </span>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          יציאה
        </span>
      </div>

      {/* Lesson content */}
      <div className={styles.lessonContent}>
        {page != 0 ? (
          <>
            <div className={styles.contentHeadline}>
              {lessonPlan[chapter_id].lessons[lesson_id].page_titels[page - 1]}
            </div>
            <div className={styles.lessonDescription}>
              {/* // lessonPlan[chapter_id].lessons[lesson_id].page_subtitles[
                //   page - 1
                // ] */}
              <span
                className={
                  page === 1 || page === 4
                    ? styles.breadcrumbsActive
                    : styles.breadcrumbsFade
                }
              >
                {page === 1
                  ? " א - מושגים מעולמות החלל "
                  : " א - מושגים מעולמות התיכנות "}
              </span>
              &nbsp;|&nbsp;
              <span
                className={
                  page === 2 || page === 5
                    ? styles.breadcrumbsActive
                    : styles.breadcrumbsFade
                }
              >
                ב - מה הבנתי?
              </span>
              &nbsp;|&nbsp;
              <span
                className={
                  page === 3 || page === 6
                    ? styles.breadcrumbsActive
                    : styles.breadcrumbsFade
                }
              >
                {page === 3
                  ? " ג - פעילויות להעשרה ולכיף "
                  : " ג - פעילות קבוצתית "}
              </span>
            </div>
            {/* <div className={styles.contentHeadline}>
              שיעור {lesson_id + 1}: &nbsp;
              {lessonPlan[chapter_id].lessons[lesson_id][`name_${gender}`]}
            </div>
            <div className={styles.lessonDescription}>
              {lessonPlan[chapter_id].lessons[lesson_id].lesson_description}
            </div> */}
          </>
        ) : null}

        {/* PAGE-0 !  content via progress: Opening */}
        {page === 0 ? (
          <div className={styles.opening}>
            {opening(lessonPlan, chapter_id, lesson_id, gender)}
          </div>
        ) : null}
        {/* PAGE-1 !  content via progress: Space Section */}
        {page === 1 ? (
          <div className={styles.spaceContentSection}>
            {/* 1. text */}
            <div className={styles.spaceConceptsSection}>
              {concepts(lessonPlan, chapter_id, lesson_id, gender)}
            </div>

            {/* 2. image */}
            <div className={styles.spaceImages}>
              {conceptsImgs(lessonPlan, chapter_id, lesson_id)}
            </div>
          </div>
        ) : null}

        {/* PAGE-2 !  content via progress: Space Questions */}
        {page === 2 ? (
          <div className={styles.spaceQustionsSection}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 2 }} error={error} variant="standard">
                <div className={styles.spaceQuestionInstructions}>
                  {gender === "F"
                    ? "לפניכן מספר שאלות בנושאים הקשורים למידע שהרגע למדתן, בחרו באחת התשובות ובדקו האם צדקתן"
                    : "לפניכם מספר שאלות בנושאים הקשורים למידע שהרגע למדתם, בחרו באחת התשובות ובדקו האם צדקתם"}
                </div>
                {getQuestionsAndAnswers(
                  lessonPlan,
                  chapter_id,
                  lesson_id,
                  values,
                  handleRadioChange
                )}
                <FormHelperText
                  sx={{
                    color: "#3b98d6",
                    fontSize: 16,
                    mb: 5,
                    textAlign: "center",
                  }}
                >
                  {helperText.split("\n").map((ht) =>
                    ht.length === 0 ? null : (
                      <>
                        {ht}
                        <br />
                      </>
                    )
                  )}
                </FormHelperText>

                <Button
                  disabled={answers.some((x) => x === -1)}
                  sx={{ mt: 1, mr: 1 }}
                  type="submit"
                  variant="outlined"
                >
                  {gender == "F" ? "בדקי את עצמך!" : "בדוק את עצמך!"}
                </Button>
              </FormControl>
            </form>
          </div>
        ) : null}

        {/* PAGE-3 !  content via progress: Space FUN */}
        {page === 3 ? (
          <div className={styles.spaceFunSection}>
            {getFunRiddle(
              lessonPlan,
              chapter_id,
              lesson_id,
              gender,
              riddleAnswer,
              handleRiddleAnswer
            )}
            {getFunDyk(lessonPlan, chapter_id, lesson_id, gender)}
            {getFunDiy(lessonPlan, chapter_id, lesson_id, gender)}
            <div className={styles.funDiveder}>
              <hr />
              שמעת על המדעניות והמדענים הבאות והבאים?
              <hr />
            </div>

            {people.map((person) => getFunPeople(gender, person))}
          </div>
        ) : null}

        {/* PAGE-4 !  content via progress: Code Concepts */}

        {page === 4 ? (
          <div className={styles.spaceContentSection}>
            {/* 1. text */}
            <div className={styles.spaceConceptsSection}>
              {codeConcepts(lessonPlan, chapter_id, lesson_id, gender)}
            </div>

            {/* 2. image */}
            <div className={styles.spaceImages}>
              {codeConceptsImgs(lessonPlan, chapter_id, lesson_id)}
            </div>
          </div>
        ) : null}

        {/* PAGE-5 !  content via progress: Code Practice */}
        {page === 5 ? (
          <div>
            {/* Explanation */}
            <div className={styles.codeExersiceDescription}>
              {
                lessonPlan[chapter_id].lessons[lesson_id].code_practice[
                  `explanation_${gender}`
                ]
              }
            </div>
            {codeExercise(
              lessonPlan,
              chapter_id,
              lesson_id,
              gender,
              "code_practice",
              handleSnippetClicked,
              userAnswer,
              setAnswerCheck,
              answerCheck,
              setUserAnswer,
              () => {},
              [],
              false,
              () => {},
              singleAnswerFeedbackToggle,
              setSingleAnswerFeedbackToggle,
              stateStore.position,
              feedbackForProgramming,
              setFeedbackForProgramming,
              answersSingleExerxcise,
              setAnswersSingleExerxcise,
              answersGroupExerxcise,
              setAnswersGroupExerxcise,
              answersPracticeAExerxcise,
              setAnswersPracticeAExerxcise,
              answersPracticeBExerxcise,
              setAnswersPracticeBExerxcise
            )}
          </div>
        ) : null}
        {/* PAGE-6 !  content via progress: FInal question */}
        {page === 6 ? (
          <div>
            {/* Explanation */}
            <div className={styles.groupCodingDescription}>
              {/* intro text - with split */}
              {readJsonWithBreaks(
                lessonPlan[chapter_id].lessons[lesson_id].group_coding[
                  `explanation_${gender}`
                ]
              )}

              {/* list of team members */}
              <div>
                <br />
                כרגע בקבוצה שלך יש {groupNames.length}
                <span>
                  {gender === "F" ? " נשות ואנשי צוות:" : " אנשי צוות:"}
                </span>
              </div>
              <ul>
                {groupNames.map((gn, i) => (
                  <li>
                    {gn}
                    {i === stateStore.position - 1
                      ? getChatIcon(gender, stateStore.position)
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
            {/* first question + title */}
            {codeExercise(
              lessonPlan,
              chapter_id,
              lesson_id,
              gender,
              "group_coding",
              handleGroupSnippetClicked,
              groupAnswer,
              setAnswerCheck,
              answerCheck,
              setGroupAnswer,
              setVarsFromGroup,
              varsFromGroup,
              groupAnswerFeedbackToggle,
              setGroupAnswerFeedbackToggle,
              // false,
              // () => {}
              singleAnswerFeedbackToggle,
              setSingleAnswerFeedbackToggle,
              stateStore.position,
              feedbackForProgramming,
              setFeedbackForProgramming,
              answersSingleExerxcise,
              setAnswersSingleExerxcise,
              answersGroupExerxcise,
              setAnswersGroupExerxcise,
              answersPracticeAExerxcise,
              setAnswersPracticeAExerxcise,
              answersPracticeBExerxcise,
              setAnswersPracticeBExerxcise
            )}
            {/* second question + title */}
            {/* save answers */}
            <div>
              <GroupChat />
              <div className={styles.keepSafe}>
                <span
                  className={`${styles.keepSafeFlag} ${"fa-solid fa-flag"}`}
                >
                  &nbsp;&nbsp;
                </span>
                <span>
                  {gender === "F"
                    ? "שימרי על עצמך! אל תעבירי פרטים אישיים בצאט. במידה ואת חשה לא בנוח מכל סיבה שהיא, בבקשה הודיעי לי מיד בכתובת"
                    : "שמור על עצמך! אל תעביר פרטים אישיים בצאט. במידה ואתה חש לא בנוח מכל סיבה שהיא, בבקשה הודיע לי מיד בכתובת"}
                  <a
                    className={styles.mailLink}
                    href={
                      "mailto:space.project@galia.dev?subject=נתקלתי בבעיה בצ'אט&body=היי, תוכלי לבדוק את הצ'אט? - אני בקבוצה" +
                      " " +
                      stateStore.group
                    }
                  >
                    &nbsp; space.project@galia.dev&nbsp;
                  </a>
                  &nbsp;&nbsp;
                </span>
                <span
                  className={`${styles.keepSafeFlag} ${"fa-solid fa-flag"}`}
                >
                  &nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* /////////////// buttons /////////////// */}
        <div className={styles.pageButtons}>
          <Button
            onClick={() => changePageAndScroll(page - 1)}
            variant="outlined"
            className={styles.AgreeButton}
            disabled={page === 0 && lesson_id === 0}
          >
            אחורה!
          </Button>
          <Button
            onClick={() => changePageAndScroll(page + 1)}
            variant="outlined"
            className={styles.AgreeButton}
          >
            קדימה!
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const jsonDirectory = path.join(process.cwd(), "json");
  const lessonPlan = await fs.readFile(jsonDirectory + "/course.json", {
    encoding: "utf8",
  });

  return {
    props: {
      lessonPlan: JSON.parse(lessonPlan),
    },
  };
}
