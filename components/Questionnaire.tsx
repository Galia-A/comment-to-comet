import styles from "@/styles/StartDetails.module.css";
import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useRadioGroup } from "@mui/material/RadioGroup";

import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

const WhiteRadio = styled(Radio)({
  "& .MuiSvgIcon-root": {
    color: "#F7EFFF",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#47B5FF",
  },
});

type FormData = {
  age: string;
  gender: string;
  majorChoice: string[];
  majorChoiceOther: string;
  knowledgeInProgramming: string;
  knowledgeInSpaceConcepts: string;
  howDidYouGetHere: string;
  attitude: Record<number, string>;
};

const isFilledOut = (fd: FormData): boolean => {
  const entries = Object.entries(fd);
  const withoutMajorChoiceOther = entries.filter(
    ([k, _]) => k !== "majorChoiceOther",
  );
  return withoutMajorChoiceOther.every(([k, v]) => {
    switch (k) {
      case "attitude":
        return Object.entries(v).length == 25;
      case "majorChoice":
        return (v as string[]).length > 0;
      default:
        return (v as string).length > 0;
    }
  });
};

export default function Questionnaire() {
  //css
  //all form
  const [isFocused, setIsFocused] = useState<boolean[]>(
    Array(25 + 6).fill(false),
  );
  const labelStyleIn = (idx: number) =>
    isFocused[idx] ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    majorChoice: [],
    majorChoiceOther: "",
    knowledgeInProgramming: "",
    knowledgeInSpaceConcepts: "",
    howDidYouGetHere: "",
    attitude: {},
  });

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const name = event.target.name ?? "";
    setFormData((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleAttitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      attitude: { ...prevData.attitude, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Send formData to Firebase later
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
    " אני חושב.ת שיהיה לי כיף ללמוד על חלל וחשיבה מחשובית",
    "מסקרן אותי לדעת איך דברים עובדים בחלל",
    "הכרת תכנים על חלל ומקצועות המחשב גורמת ליום שלי להיות מגניב",
    "מעניין אותי לדעת איך אפשר להיעזר בטכנולוגיה כדי להבין את החלל",
    "ללמוד דברים חדשים בקורס הזה נשמע כמו הרפתקה נהדרת",
    "חשיפה לעולמות החלל והמחשבים יכול לעזור לי למקד את הלימודים שלי בהמשך",
    "אם אשקיע עכשיו בלימודים אוכל לעבוד במקצועות מגניבים יותר",
    "אני חושב.ת שהנושאים שאלמד בקורס הזה יהיו שימושיים עבורי כשאגדל",
    "אני מאמין.ה ששליטה בתוכן שקשור לחלל ותכנות יכול להפוך את הלימודים שלי לקלים יותר",
    "הקורס הזה יכולים לעזור לעזור לי להחליט מה אלמד בעתיד",
    "אני מאמין.ה שאוכל להצליח במשימות שיופיעו בקורס הזה",
    "אפילו אם יהיה לי קשה, אני חושב.ת שאני אוכל להבין את התוכן בקורס אם אתאמץ",
    "אני בטוח.ה שאוכל לבצע את המשימות הקשורות לחשיבה המחשובית והתכנות המופיעות בקורס הזה",
    "אני בטוח.ה שאני אדע לענות נכון על שאלות בתחום החלל.",
    "כשאני נתקל.ת בשאלה קשה, אני בטוחה. שאוכל למצוא דרך לפתור אותה",
    "חשוב לי להצליח ולהגיע לתוצאות טובות בסוף הקורס",
    "אני אוהב.ת כשאני יכול.ה לענות נכון על שאלה",
    "חשוב לי לסיים את כל המשימות שאקבל",
    "אני שמח.ה כשאני מקבל.ת משוב טוב על העבודה שעשיתי",
    "תמיד אנסה כמיטב יכולתי כי אני רוצה להיות גאה בעבודה שלי",
    "גם בנים וגם בנות יכולים להיות מעולים בהבנת תוכן בעולמות החלל והמחשב",
    "בכיתה שלי, לכולן.ם יש סיכוי לצטיין במקצועות החלל והמחשבים",
    "אני חושב.ת שגם בנים וגם בנות יכולים לעבוד במקצועות מגניבים בעולמות החלל והמחשבים",
    "כולם, לא משנה אם בנים או בנות יכולים לעבוד כחוקרים או כמומחים בעולמות החלל והמחשבים",
    "אני מאמין.ה שמקצועות החלל והמחשבים, מה שמשנה הוא כמה את.ה מנסה. ולא משנה אם את.ה בן או בת",
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
        {/* Age */}
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
            //  style={focusedQuestion === 'age' ? { color: "#47B5FF" } : { color: "#F7EFFF" }}
            // onFocus={() => setFocusedQuestion('age')}
            // onBlur={() => setFocusedQuestion(null)}
            //
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
                className={styles.whiteText}
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
                          (x) => x !== option.category,
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
                        (x) => x !== "other",
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
            style={labelStyle}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות החלל?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInSpaceConcepts"
            name="knowledgeInSpaceConcepts"
            value={formData.knowledgeInSpaceConcepts}
            onChange={handleFieldChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {spaceOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
                className={styles.whiteText}
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
            style={labelStyle}
          >
            לדעתך, מה רמת השליטה שלך במושגים מעולמות התכנות והחשיבה המחשובית?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="knowledgeInProgramming"
            name="knowledgeInProgramming"
            value={formData.knowledgeInProgramming}
            onChange={handleFieldChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {programmingOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<WhiteRadio />}
                label={option.label}
                className={styles.whiteText}
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
            style={labelStyle}
          >
            איך הגעת לכאן? האם הצטרפת כחלק מצוות, חלק מקבוצה, מהמלצה או הכרות?
          </FormLabel>
          <Input
            type="text"
            name="howDidYouGetHere"
            value={formData.howDidYouGetHere}
            onChange={handleFieldChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
                style={labelStyle}
              >
                {`${questionIndex + 1}. ${questionText}`}
              </FormLabel>
              <RadioGroup
                row
                aria-label={`question_${questionIndex}`}
                name={`question_${questionIndex}`}
                value={formData.attitude[`question_${questionIndex}`] || ""}
                onChange={handleAttitudeChange}
              >
                {attitudeAnswers.map((answerText, answerIndex) => (
                  <FormControlLabel
                    key={answerIndex}
                    value={answerText}
                    control={<WhiteRadio />}
                    label={answerText}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className={styles.questionGap}></div>
        </FormControl>
      </form>
    </div>
  );
}
