import fs from "fs/promises";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Course.module.css";
import logo from "../../public/logo.png";
import Image from "next/image";
import LP from "../../public/json/course.json";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

//TODO - Fix colors!! ///////////////////
// const theme = createTheme({
//   status: {
//     danger: "#e53e3e",
//   },
//   palette: {
//     primary: {
//       main: "#0971f1",
//       darker: "#053e85",
//     },
//     neutral: {
//       main: "#64748B",
//       contrastText: "#fff",
//     },
//   },
// });

type LessonPlan = typeof LP;
type People = LessonPlan[number]["lessons"][number]["fun_blocks"]["people"];

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
      <div className={styles.spaceConceptsHeader}>{header}</div>
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
  console.dir(lesson);
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

      {diy["text_F"].split("\n").map((txt, i) =>
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
      <div className={styles.spaceConceptsHeader}>{header}</div>
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
      width={150}
      height={150}
      alt={lesson.code_intro.concept_images_alt[i]}
      src={imgSrc}
    />
  ));
};

// Code concepts - images - reading from JSON//
const codeExercise = (
  lessonPlan: LessonPlan,
  chapterId: number,
  lessonId: number,
  gender: "F" | "M",
  handleSnippetClicked: (i: number) => React.MouseEventHandler,
  userAnswer: number[]
) => {
  const lesson = lessonPlan[chapterId].lessons[lessonId];
  const exercises = lesson.code_practice.exercises;

  return exercises.map((exercise, i) => {
    return (
      <div>
        <span className={styles.codeTitleDiveder}>
          <hr />
          {exercise.title}
          <hr />
        </span>
        <div className={styles.codeQuestion}>{exercise.question}</div>
        <div className={styles.codeQuestionDetails}>
          {exercise[`question_details_${gender}`]}
        </div>

        <div className={styles.codeExerArea}>
          <div className={styles.codeSnippets}>
            {exercise.code_snippets.map((cs, j) => (
              <div className={styles.snippet} onClick={handleSnippetClicked(j)}>
                {cs}
              </div>
            ))}
          </div>
          <div className={styles.coddingArea}>
            {userAnswer.map((ua) => (
              <>
                <div className={styles.codeBlock}>
                  {exercise.code_snippets[ua]}
                </div>
                <br />
              </>
            ))}
          </div>
        </div>
      </div>
    );
  });
};

////////////////////// Page content //////////////////////
export default function Course({ lessonPlan }: { lessonPlan: LessonPlan }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const chapter_id = +router.query.id!;
  const lesson_id = 0;
  const gender = "F";
  const lesson = lessonPlan[chapter_id].lessons[lesson_id];
  const people = lesson.fun_blocks.people;

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

    console.log(values);
    console.log(answers);

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
    if (!riddleAnswer) {
      setRiddleAnswer(true);
    } else {
      setRiddleAnswer(false);
    }
  };

  const exercise = lessonPlan[1].lessons[0].code_practice.exercises[0];
  const [userAnswer, setUserAnswer] = useState<number[]>(
    exercise.code_start_pos
  );
  const handleSnippetClicked: (i: number) => React.MouseEventHandler =
    (i) => (_) => {
      setUserAnswer([...userAnswer, i]);
    };

  //   console.dir(router.query);
  //   console.log(`page = ${page}`);

  return (
    <>
      <Head>
        <title>Cadets Program | Course #{chapter_id}</title>
      </Head>
      {/* Top Menu */}
      <div className={styles.topMenu}>
        <span>
          <Image src={logo} alt="site logo" className={styles.topLogo} />
          פרק&nbsp;
          {chapter_id}:&nbsp;{lessonPlan[chapter_id][`chapter_name_${gender}`]}
        </span>
        <span>שומר מקום</span>
      </div>

      {/* Lesson content */}
      <div className={styles.lessonContent}>
        <div className={styles.contentHeadline}>
          שיעור {lesson_id + 1}: &nbsp;
          {lessonPlan[chapter_id].lessons[lesson_id][`name_${gender}`]}
        </div>
        <div className={styles.lessonDescription}>
          {lessonPlan[chapter_id].lessons[lesson_id].lesson_description}
        </div>

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
          <div className={styles.codePracticePage}>
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
              handleSnippetClicked,
              userAnswer
            )}
          </div>
        ) : null}

        {/* /////////////// buttons /////////////// */}
        <div className={styles.pageButtons}>
          <Button
            onClick={() => setPage(page - 1)}
            variant="outlined"
            disabled={page === 1}
          >
            אחורה!
          </Button>
          <Button onClick={() => setPage(page + 1)} variant="outlined">
            קדימה!
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const lessonPlan = await fs.readFile("./json/course.json", {
    encoding: "utf8",
  });

  return {
    props: {
      lessonPlan: JSON.parse(lessonPlan),
    },
  };
}

{
  /* `<Button variant="contained">Contained</Button>`
 <Button variant="contained" disabled>
  Disabled
</Button>
<Button variant="contained" href="#contained-buttons">
  Link
</Button> */
}
