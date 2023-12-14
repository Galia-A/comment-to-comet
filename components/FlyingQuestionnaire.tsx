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
  commentsB: string;
};

const isFilledOut = (fd: QuestionnaireDataB): boolean => {
  const entries = Object.entries(fd);
  const withoutMajorChoiceOther = entries.filter(
    ([k, _]) => k !== "majorChoiceOther"
  );
  return withoutMajorChoiceOther.every(([k, v]) => {
    switch (k) {
      case "attitudeB":
        return Object.entries(v).length == 25;
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
  commentsB: "",
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
    Array(25 + 3).fill(false)
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
    //console.log(formData); //TODO - delete
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
  const programmingOptions = [
    { value: "1", label: "ללא שליטה בכלל" },
    { value: "2", label: "שליטה במושגים בודדים" },
    { value: "3", label: "שיחקתי במשחקים כמו שעת הקוד או קוד מאנקי" },
    { value: "4", label: "למדתי על תכנות או חשיבה תכנותית בבית הספר או בחוג" },
    { value: "5", label: "מתעניין.ת מאוד בתחום ורוצה לדעת יותר" },
  ];
  const attitudeQuestions = [
    "אני חושב.ת שיהיה לי כיף ללמוד על חלל וחשיבה מחשובית",
    "חשיפה לעולמות החלל והמחשבים יכול לעזור לי למקד את הלימודים שלי בהמשך",
    "אני מאמין.ה שאוכל להצליח במשימות שיופיעו בקורס הזה",
    "חשוב לי להצליח ולהגיע לתוצאות טובות בסוף הקורס",
    "גם בנים וגם בנות יכולים להיות מעולים בהבנת תוכן בעולמות החלל והמחשב",
    "אם אשקיע עכשיו בלימודים אוכל לעבוד במקצועות מגניבים יותר",
    "אפילו אם יהיה לי קשה, אני חושב.ת שאני אוכל להבין את התוכן בקורס אם אתאמץ",
    "אני אוהב.ת כשאני יכול.ה לענות נכון על שאלה",
    "בכיתה שלי, לכולן.ם יש סיכוי לצטיין במקצועות החלל והמחשבים",
    "מסקרן אותי לדעת איך דברים עובדים בחלל",
    "אני בטוח.ה שאוכל לבצע את המשימות הקשורות לחשיבה המחשובית והתכנות המופיעות בקורס הזה",
    "חשוב לי לסיים את כל המשימות שאקבל",
    "אני חושב.ת שגם בנים וגם בנות יכולים לעבוד במקצועות מגניבים בעולמות החלל והמחשבים",
    "הכרת תכנים על חלל ומקצועות המחשב גורמת ליום שלי להיות מגניב",
    "אני חושב.ת שהנושאים שאלמד בקורס הזה יהיו שימושיים עבורי כשאגדל",
    "אני שמח.ה כשאני מקבל.ת משוב טוב על העבודה שעשיתי",
    "כולם, לא משנה אם בנים או בנות יכולים לעבוד כחוקרים או כמומחים בעולמות החלל והמחשבים",
    "מעניין אותי לדעת איך אפשר להיעזר בטכנולוגיה כדי להבין את החלל",
    "אני מאמין.ה ששליטה בתוכן שקשור לחלל ותכנות יכול להפוך את הלימודים שלי לקלים יותר",
    "אני בטוח.ה שאני אדע לענות נכון על שאלות בתחום החלל",
    "אני מאמין.ה שכדי להצליח במקצועות החלל והמחשבים צריך להשקיע ולנסות. ולא משנה אם את.ה בן או בת",
    "ללמוד דברים חדשים בקורס הזה נשמע כמו הרפתקה נהדרת",
    "הקורס הזה יכול לעזור לעזור לי להחליט מה אלמד בעתיד",
    "כשאני נתקל.ת בשאלה קשה, אני בטוחה. שאוכל למצוא דרך לפתור אותה",
    "תמיד אנסה כמיטב יכולתי כי אני רוצה להיות גאה בעבודה שלי",
  ];
  const attitudeAnswers = [
    "לא מסכימ.ה בכלל",
    "במידה מועטה",
    "לפעמים",
    "במידה רבה",
    "מסכימ.ה מאוד",
  ];

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>שאלון עמדות</div>
      <div className={styles.text}>
        את שאלון העמדות אתן.ם מכירות.ים - ענו שוב, הפעם בהתאם לתחושה שלכן.ם
        כרגע.
        <br />
        בשאלון המופיע בעמוד הזה יש שאלות שיעזרו לנו להכיר אתכן.ם ואת המחשבות
        שלכן.ם בנושאים שונים.
        <br />
        אין כאן תשובות נכונות ולא נכונות - פשוט ענו בצורה כנה ולפי מה שאתן.ם
        חושבות.ים ומרגישות.ים.
        <br />
        תודה על שיתוף הפעולה &nbsp;
        <span className={styles.iconSmiley}>
          <i className="fa-regular fa-face-grin-stars"></i>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          {/* ////////////////////////////////////////// */}
          {/* ////// COMMENTS ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="comment-question-label"
            className={styles.questionnaireLabel}
            style={labelStyleIn(0)}
          >
            אז...מה חשבת? יש לך הערות? מחשבות? עוד משהו לספר לי?
          </FormLabel>
          <Input
            type="text"
            name="commentsB"
            multiline
            value={formData.commentsB}
            onChange={(e) => {
              handleFieldChange(e);
            }}
            onFocus={() => turnOnFocusIn(0)}
            onBlur={() => turnOffFocusIn(0)}
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
          {/* ////////////////////////////////////////// */}
          {/* ////// knowledge In Space ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="knowledgeInSpaceConceptsB"
            className={styles.questionnaireLabel}
            style={labelStyleIn(1)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות החלל?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInSpaceConceptsB"
            name="knowledgeInSpaceConceptsB"
            value={formData.knowledgeInSpaceConceptsB}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(1)}
            onBlur={() => turnOffFocusIn(1)}
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
            style={labelStyleIn(2)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות התכנות והחשיבה המחשובית?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInProgrammingB"
            name="knowledgeInProgrammingB"
            value={formData.knowledgeInProgrammingB}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(2)}
            onBlur={() => turnOffFocusIn(2)}
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
                style={labelStyleIn(questionIndex + 3)}
              >
                {`${questionIndex + 1}. ${questionText}`}
              </FormLabel>
              <RadioGroup
                row
                aria-label={`question_${questionIndex}`}
                name={questionIndex.toString()}
                value={formData.attitudeB[questionIndex] || ""}
                onChange={handleAttitudeChange}
                onFocus={() => turnOnFocusIn(questionIndex + 3)}
                onBlur={() => turnOffFocusIn(questionIndex + 3)}
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
          disabled={false} //{!isFilledOut(formData)} //TODO - need to be disabled!
        >
          כמעט סיימנו! נמשיך לשאלון הידע
        </Button>
      </form>
    </div>
  );
}
