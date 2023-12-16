import styles from "@/styles/StartDetails.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  Checkbox,
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

type Gender = "F" | "M";

export type QuestionnaireData = {
  age: string;
  gender: Gender | "";
  majorChoice: string[];
  majorChoiceOther: string;
  knowledgeInProgramming: string;
  knowledgeInSpaceConcepts: string;
  howDidYouGetHere: string;
  attitudeA: Record<number, string>;
};

const isFilledOut = (fd: QuestionnaireData): boolean => {
  const entries = Object.entries(fd);
  const withoutMajorChoiceOther = entries.filter(
    ([k, _]) => k !== "majorChoiceOther"
  );
  return withoutMajorChoiceOther.every(([k, v]) => {
    switch (k) {
      case "attitudeA":
        return Object.entries(v).length == 25;
      case "majorChoice":
        return (v as string[]).length > 0;
      default:
        return (v as string).length > 0;
    }
  });
};

const emptyQuestionnaire: QuestionnaireData = {
  age: "",
  gender: "F",
  majorChoice: [],
  majorChoiceOther: "",
  knowledgeInProgramming: "",
  knowledgeInSpaceConcepts: "",
  howDidYouGetHere: "",
  attitudeA: {},
};

export default function Questionnaire() {
  const router = useRouter();
  //css
  //all form
  const [isFocused, setIsFocused] = useState<boolean[]>(
    Array(25 + 6).fill(false)
  );
  const labelStyleIn = (idx: number) =>
    isFocused[idx] ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const setQuestionnaire = useStore((state) => state.setQuestionnaireData);
  const setGender = useStore((state) => state.setGender);

  const [formData, setFormData] =
    useState<QuestionnaireData>(emptyQuestionnaire);

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
        attitudeA: { ...prevData.attitudeA, [name]: value },
      };
      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuestionnaire(formData);
    if (formData.gender !== "") {
      setGender(formData.gender);
      router.push("/registration/test");
    }
  };

  // Values //
  const majorOptions = [
    {
      category: "מדעים",
      examples: "(פיזיקה, כימייה, ביולוגיה, ביוטכנולוגיה)",
    },
    {
      category: "אלקטרוניקה, מדעי המחשב והמידע",
      examples: "(מדעי המחשב, הנדסת תוכנה, רובוטיקה, הנדסת חשמל, מידע ונתונים)",
    },
    {
      category: "מדעי הרוח",
      examples: "(ספרות, היסטוריה, פילוסופיה, דתות, מדעי המדינה)",
    },
    {
      category: "אמנות",
      examples: "(תאטרון, מוזיקה, ציור, קולנוע)",
    },
    {
      category: "שפות",
      examples: "(ערבית, איטלקית, צרפתית)",
    },
  ];

  const genderOptions = [
    { value: "F", label: "נקבה" },
    { value: "M", label: "זכר" },
  ];
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
    "בכיתה שלי, לכולן.ם יש סיכוי להצטיין במקצועות החלל והמחשבים",
    "מסקרן אותי לדעת איך דברים עובדים בחלל",
    "אני בטוח.ה שאוכל לבצע את המשימות הקשורות לחשיבה המחשובית והתכנות המופיעות בקורס הזה",
    "חשוב לי לסיים את כל המשימות שאקבל",
    "אני חושב.ת שגם בנים וגם בנות יכולים לעבוד במקצועות מגניבים בעולמות החלל והמחשבים",
    "הכרת תכנים על חלל ומקצועות המחשב גורמת ליום שלי להיות מגניב",
    "אני חושב.ת שהנושאים שאלמד בקורס הזה יהיו שימושיים עבורי כשאגדל",
    "אני שמח.ה כשאני מקבל.ת משוב טוב על העבודה שעשיתי",
    "כולם, לא משנה אם בנים או בנות יכולים לעבוד כחוקרות.ים או כמומחיות.ים בעולמות החלל והמחשבים",
    "מעניין אותי לדעת איך אפשר להיעזר בטכנולוגיה כדי להבין את החלל",
    "אני מאמין.ה ששליטה בתוכן שקשור לחלל ותכנות יכול להפוך את הלימודים שלי לקלים יותר",
    "אני בטוח.ה שאני אדע לענות נכון על שאלות בתחום החלל",
    "אני מאמין.ה שכדי להצליח במקצועות החלל והמחשבים צריך להשקיע ולנסות. ולא משנה אם את.ה בן או בת",
    "ללמוד דברים חדשים בקורס הזה נשמע כמו הרפתקה נהדרת",
    "הקורס הזה יכול לעזור לעזור לי להחליט מה אלמד בעתיד",
    "כשאני נתקל.ת בשאלה קשה, אני בטוח.ה שאוכל למצוא דרך לפתור אותה",
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
      <div className={styles.contentHeadline}>שלב 2: שאלון עמדות</div>
      <div className={styles.text}>
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
          {/* ////// AGE ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="age-question-label"
            className={styles.questionnaireLabel}
            style={labelStyleIn(0)}
          >
            שנת לידה:
          </FormLabel>
          <Input
            type="text"
            name="age"
            value={formData.age}
            onChange={(e) => {
              // Ensure that only 4-digit numbers are set
              if (e.target.value.length <= 4) {
                handleFieldChange(e);
              }
            }}
            onFocus={() => turnOnFocusIn(0)}
            onBlur={() => turnOffFocusIn(0)}
            placeholder="1900"
            style={{
              marginRight: "30px",
              width: "80px",
              color: isFocused ? "#47B5FF" : "#F7EFFF",
              borderBottomColor: isFocused ? "#47B5FF" : "#F7EFFF",
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "ltr",
            }}
            inputProps={{
              style: { textAlign: "center" },
            }}
          />
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// GENDER ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="gender-question-label"
            className={styles.questionnaireLabel}
            style={labelStyleIn(1)}
          >
            מגדר (לשון פנייה מועדפת):
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-question-label"
            name="gender"
            value={formData.gender}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(1)}
            onBlur={() => turnOffFocusIn(1)}
          >
            {genderOptions.map((option) => (
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
          {/* ////// MAJOR ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            component="legend"
            className={styles.questionnaireLabel}
            style={labelStyleIn(2)}
          >
            אילו מקצועות בגרות מעניינים אותך? (גם אם כבר סיימת אותם)
          </FormLabel>
          {majorOptions.map((option) => (
            <FormControlLabel
              name="majorChoice"
              key={option.category}
              control={
                <Checkbox
                  style={{
                    color: formData.majorChoice.includes(option.category)
                      ? "#47B5FF"
                      : "#F7EFFF",
                  }}
                  checked={formData.majorChoice.includes(option.category)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        majorChoice: [...prev.majorChoice, option.category],
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        majorChoice: prev.majorChoice.filter(
                          (x) => x !== option.category
                        ),
                      }));
                    }
                  }}
                />
              }
              label={`${option.category} ${option.examples}`}
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  color: formData.majorChoice.includes("other")
                    ? "#47B5FF"
                    : "#F7EFFF",
                }}
                checked={formData.majorChoice.includes("other")}
                onChange={(event) => {
                  if (event.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      majorChoice: [...prev.majorChoice, "other"],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      majorChoice: prev.majorChoice.filter(
                        (x) => x !== "other"
                      ),
                      majorChoiceOther: "",
                    }));
                  }
                }}
              />
            }
            label="אחר:"
          />
          {formData.majorChoice.includes("other") && (
            <Input
              name="majorChoiceOther"
              value={formData.majorChoiceOther}
              onChange={handleFieldChange}
              placeholder="מקצועות בגרות נוספים"
              onFocus={() => turnOnFocusIn(2)}
              onBlur={() => turnOffFocusIn(2)}
              style={{
                marginRight: "30px",
                width: "70%",
                color: isFocused ? "#47B5FF" : "#F7EFFF",
                borderBottomColor: isFocused ? "#47B5FF" : "#F7EFFF",
                borderWidth: "0px",
                borderBottomWidth: "1px",
                borderStyle: "solid",
                direction: "rtl",
              }}
            />
          )}
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// knowledge In Space ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="knowledgeInSpaceConcepts"
            className={styles.questionnaireLabel}
            style={labelStyleIn(3)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות החלל?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInSpaceConcepts"
            name="knowledgeInSpaceConcepts"
            value={formData.knowledgeInSpaceConcepts}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(3)}
            onBlur={() => turnOffFocusIn(3)}
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
            id="knowledgeInProgramming"
            className={styles.questionnaireLabel}
            style={labelStyleIn(4)}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות התכנות והחשיבה המחשובית?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInProgramming"
            name="knowledgeInProgramming"
            value={formData.knowledgeInProgramming}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(4)}
            onBlur={() => turnOffFocusIn(4)}
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
          {/* ////// WHERE FROM ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="fromwhere-question-label"
            className={styles.questionnaireLabel}
            style={labelStyleIn(5)}
          >
            איך הגעת לכאן? האם הצטרפת כחלק מצוות, חלק מקבוצה, מהמלצה או הכרות?
          </FormLabel>
          <Input
            type="text"
            name="howDidYouGetHere"
            value={formData.howDidYouGetHere}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(5)}
            onBlur={() => turnOffFocusIn(5)}
            placeholder="אני חלק מ..."
            style={{
              marginRight: "30px",
              width: "70%",
              color: isFocused ? "#47B5FF" : "#F7EFFF",
              borderBottomColor: isFocused ? "#47B5FF" : "#F7EFFF",
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
                value={formData.attitudeA[questionIndex] || ""}
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
          // disabled={!isFilledOut(formData)} //TODO - need to be disabled!
        >
          כמעט סיימנו! נמשיך לשאלון השני (מתוך שניים)
        </Button>
      </form>
    </div>
  );
}
