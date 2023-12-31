import styles from "@/styles/StartDetails.module.css";
import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  FormControl,
  Button,
} from "@mui/material";
import useStore from "@/utils/store";

const WhiteRadio = styled(Radio)({
  "& .MuiSvgIcon-root": {
    color: "#F7EFFF",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#47B5FF",
  },
});

export type QuestionnaireDataB = {
  knowledgeInProgrammingB: string;
  knowledgeInSpaceConceptsB: string;
  attitudeB: Record<number, string>;
  feedback1: string;
  feedback2: string;
  feedback3: string;
  feedback4: string;
};

const isFilledOut = (fd: QuestionnaireDataB): boolean => {
  const entries = Object.entries(fd);
  const withoutMajorChoiceOther = entries.filter(
    ([k, _]) => k !== "majorChoiceOther"
  );
  return withoutMajorChoiceOther.every(([k, v]) => {
    switch (k) {
      case "attitudeB":
        return Object.entries(v).length == 15;
      case "majorChoice":
        return (v as string[]).length > 0;
      default:
        return (v as string).length > 0;
    }
  });
};

const emptyQuestionnaireB: QuestionnaireDataB = {
  knowledgeInProgrammingB: "",
  knowledgeInSpaceConceptsB: "",
  attitudeB: {},
  feedback1: "",
  feedback2: "",
  feedback3: "",
  feedback4: "",
};

export default function QuestionnaireB() {
  const router = useRouter();
  const stateStore = useStore();

  // Checked log-in
  useEffect(() => {
    // Check if user is logged in
    if (!stateStore.isLoggedIn) {
      router.push(`/`);
    }
  }, [stateStore.isLoggedIn]);

  //css
  //all form
  const [isFocused, setIsFocused] = useState<boolean[]>(
    Array(15 + 6).fill(false)
  );
  const labelStyleIn = (idx: number) =>
    isFocused[idx] ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const setQuestionnaireB = useStore((state) => state.setQuestionnaireDataB);

  const [formData, setFormData] =
    useState<QuestionnaireDataB>(emptyQuestionnaireB);

  const toggleFocusIn =
    (state: boolean) =>
    (idx: number): void => {
      const newIsFocused = isFocused.slice();
      newIsFocused[idx] = state;
      setIsFocused(newIsFocused);
    };

  const turnOnFocusIn = toggleFocusIn(true);
  const turnOffFocusIn = toggleFocusIn(false);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = event.target.name ?? "";
    setFormData((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleAttitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        attitudeB: { ...prevData.attitudeB, [name]: value },
      };
      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuestionnaireB(formData);
    router.push("/flying/flyingtest");
  };

  // Values //
  const spaceOptions = [
    { value: "1", label: "ללא שליטה בכלל" },
    { value: "2", label: "שליטה במושגים בודדים" },
    { value: "3", label: "יכול.ה להסביר את המושגים אבל לא חקרתי מעבר" },
    { value: "4", label: "למדתי על חלל בבית הספר או בחוג" },
    { value: "5", label: "מתעניין.ת מאוד בתחום ורוצה לדעת יותר" },
  ];
  const feedbackOptions = [
    { value: "1", label: "בכלל לא" },
    { value: "2", label: "מעט" },
    { value: "3", label: "במידה בינונית" },
    { value: "4", label: "קצת" },
    { value: "5", label: "הרבה" },
  ];
  const programmingOptions = [
    { value: "1", label: "ללא שליטה בכלל" },
    { value: "2", label: "שליטה במושגים בודדים" },
    { value: "3", label: "שיחקתי במשחקים כמו שעת הקוד או קוד מאנקי" },
    { value: "4", label: "למדתי על תכנות או חשיבה תכנותית בבית הספר או בחוג" },
    { value: "5", label: "מתעניין.ת מאוד בתחום ורוצה לדעת יותר" },
  ];
  const attitudeQuestions = [
    "מסקרן אותי לדעת איך דברים עובדים בחלל",
    "חשיפה לעולמות החלל והמחשבים יכול לעזור לי למקד את הלימודים שלי בהמשך",
    "אני מאמין.ה שאוכל להצליח במשימות שיופיעו בקורס הזה",
    "חשוב לי להצליח ולהגיע לתוצאות טובות בסוף הקורס",
    "גם בנים וגם בנות יכולים להיות מעולים בהבנת תוכן בעולמות החלל והמחשב",
    "אני חושב.ת שהנושאים שאלמד בקורס הזה יהיו שימושיים עבורי כשאגדל",
    "אני בטוח.ה שאני אדע לענות נכון על שאלות בתחום החלל",
    "חשוב לי לסיים את כל המשימות שאקבל",
    "כולם, לא משנה אם בנים או בנות יכולים לעבוד כחוקרות.ים או כמומחיות.ים בעולמות החלל והמחשבים",
    "הכרת תכנים על חלל ומקצועות המחשב גורמת ליום שלי להיות מגניב",
    "כשאני נתקל.ת בשאלה קשה, אני בטוח.ה שאוכל למצוא דרך לפתור אותה",
    "תמיד אנסה כמיטב יכולתי כי אני רוצה להיות גאה בעבודה שלי",
    "אני מאמין.ה שכדי להצליח במקצועות החלל והמחשבים צריך להשקיע ולנסות. ולא משנה אם את.ה בן או בת",
    "ללמוד דברים חדשים בקורס הזה נשמע כמו הרפתקה נהדרת",
    "אני מאמין.ה ששליטה בתוכן שקשור לחלל ותכנות יכול להפוך את הלימודים שלי לקלים יותר",
  ];
  //  "",
  // "אני חושב.ת שיהיה לי כיף ללמוד על חלל וחשיבה מחשובית",
  // "אם אשקיע עכשיו בלימודים אוכל לעבוד במקצועות מגניבים יותר",
  // "אפילו אם יהיה לי קשה, אני חושב.ת שאני אוכל להבין את התוכן בקורס אם אתאמץ",
  // "אני אוהב.ת כשאני יכול.ה לענות נכון על שאלה",
  // "בכיתה שלי, לכולן.ם יש סיכוי להצטיין במקצועות החלל והמחשבים",
  // "אני בטוח.ה שאוכל לבצע את המשימות הקשורות לחשיבה המחשובית והתכנות המופיעות בקורס הזה",
  // "אני חושב.ת שגם בנים וגם בנות יכולים לעבוד במקצועות מגניבים בעולמות החלל והמחשבים",
  // "אני שמח.ה כשאני מקבל.ת משוב טוב על העבודה שעשיתי",
  // "מעניין אותי לדעת איך אפשר להיעזר בטכנולוגיה כדי להבין את החלל",
  // "הקורס הזה יכול לעזור לעזור לי להחליט מה אלמד בעתיד",
  const attitudeAnswers = [
    "לא מסכימ.ה בכלל",
    "במידה מועטה",
    "לפעמים",
    "במידה רבה",
    "מסכימ.ה מאוד",
  ];

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}> איך היה?</div>
      <div className={styles.text}>
        כאן המקום שלך לספר לי קצת מה חשבת &nbsp;
        <span className={styles.iconSmiley}>
          <i className="fa-regular fa-face-grin-stars"></i>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          {/* ////////////////////////////////////////// */}
          {/* ////// FEEDBACK 1 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="feedback1"
            className={styles.questionnaireLabel}
            style={labelStyleIn(0)}
          >
            האם הרגשת שיש קשר בין הצלחה במשימות לתכנים ששולבו בו?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="feedback1"
            name="feedback1"
            value={formData.feedback1}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(0)}
            onBlur={() => turnOffFocusIn(0)}
          >
            {feedbackOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// FEEDBACK 2 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="feedback2"
            className={styles.questionnaireLabel}
            style={labelStyleIn(1)}
          >
            באיזו מידה נהנית?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="feedback2"
            name="feedback2"
            value={formData.feedback2}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(1)}
            onBlur={() => turnOffFocusIn(1)}
          >
            {feedbackOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// FEEDBACK 3 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="feedback3"
            className={styles.questionnaireLabel}
            style={labelStyleIn(2)}
          >
            {stateStore.gender === "F"
              ? "באיזו מידה תמליצי לאחרים לשחק במשחק?"
              : "באיזו מידה תמליץ לאחרים לשחק במשחק?"}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="feedback3"
            name="feedback3"
            value={formData.feedback3}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(2)}
            onBlur={() => turnOffFocusIn(2)}
          >
            {feedbackOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// FEEDBACK 4 - COMMENTS ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="feedback4"
            className={styles.questionnaireLabel}
            style={labelStyleIn(3)}
          >
            אז...מה חשבת? יש לך הערות? מחשבות? עוד משהו לספר לי?
          </FormLabel>
          <Input
            type="text"
            name="feedback4"
            multiline
            value={formData.feedback4}
            onChange={(e) => {
              handleFieldChange(e);
            }}
            onFocus={() => turnOnFocusIn(3)}
            onBlur={() => turnOffFocusIn(3)}
            placeholder=""
            style={{
              marginRight: "30px",
              width: "70%",
              color: isFocused ? "#47B5FF" : "#F7EFFF",
              borderColor: isFocused ? "#47B5FF" : "#F7EFFF",
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "rtl",
            }}
            inputProps={{
              style: { textAlign: "right" },
            }}
          />
          <div className={styles.questionGap}></div>
          <div className={styles.questionGap}></div>
          <div className={styles.questionGap}></div>
          <div className={styles.contentHeadline}>
            השאלות הבאות יהיו מוכרות - יש לענות עליהן שוב, לפי התחושה שלך כרגע
          </div>
          {/* ////////////////////////////////////////// */}
          {/* ////// knowledge In Space ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="knowledgeInSpaceConceptsB"
            className={styles.questionnaireLabel}
            style={labelStyleIn(4)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות החלל?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInSpaceConceptsB"
            name="knowledgeInSpaceConceptsB"
            value={formData.knowledgeInSpaceConceptsB}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(4)}
            onBlur={() => turnOffFocusIn(4)}
          >
            {spaceOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// knowledge In Programming ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="knowledgeInProgrammingB"
            className={styles.questionnaireLabel}
            style={labelStyleIn(5)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות התכנות והחשיבה המחשובית?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInProgrammingB"
            name="knowledgeInProgrammingB"
            value={formData.knowledgeInProgrammingB}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(5)}
            onBlur={() => turnOffFocusIn(5)}
          >
            {programmingOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// Attitude ////// */}
          {/* ////////////////////////////////////////// */}

          {attitudeQuestions.map((questionText, questionIndex) => (
            <div key={questionIndex} style={{ margin: "20px 0" }}>
              <FormLabel
                component="legend"
                className={styles.questionnaireLabel}
                style={labelStyleIn(questionIndex + 6)}
              >
                {`${questionIndex + 1}. ${questionText}`}
              </FormLabel>
              <RadioGroup
                row
                aria-label={`question_${questionIndex}`}
                name={questionIndex.toString()}
                value={formData.attitudeB[questionIndex] || ""}
                onChange={handleAttitudeChange}
                onFocus={() => turnOnFocusIn(questionIndex + 6)}
                onBlur={() => turnOffFocusIn(questionIndex + 6)}
              >
                {attitudeAnswers.map((answerText, answerIndex) => (
                  <FormControlLabel
                    key={answerIndex}
                    value={answerIndex}
                    control={<WhiteRadio />}
                    label={answerText}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className={styles.questionGap}></div>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          type="submit"
          className={styles.AgreeButton}
          disabled={!isFilledOut(formData)} //TODO - need to be disabled!
        >
          קדימה
        </Button>
      </form>
    </div>
  );
}
