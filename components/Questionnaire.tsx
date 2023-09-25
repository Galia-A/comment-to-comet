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
  majorChoice: string;
  majorChoiceOther: string;
  knowledgeInProgramming: string;
  knowledgeInSpaceConcepts: string;
  howDidYouGetHere: string;
  attitude: Record<string, string>;
};

export default function Questionnaire() {
  //css
  //all form
  const [isFocused, setIsFocused] = useState(false);
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const labelStyle = isFocused ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    majorChoice: "",
    majorChoiceOther: "",
    knowledgeInProgramming: "",
    knowledgeInSpaceConcepts: "",
    howDidYouGetHere: "",
    attitude: {},
  });

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  // Keeping values + controling radio buttons colors //
  const [selectedAgeValue, setSelectedAgeValue] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [selectedGenderValue, setSelectedGenderValue] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [otherMajor, setOtherMajor] = useState("");
  const [selectedSpaceValue, setSelectedSpaceValue] = useState("");
  const [selectedProgrammingValue, setSelectedProgrammingValue] = useState("");
  const [fromWhereValue, setFromWhereValue] = useState("");

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
            style={labelStyle}
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            style={labelStyle}
          >
            מגדר (לשון פנייה מועדפת):
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-question-label"
            name="gender"
            value={formData.gender}
            onChange={handleFieldChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            style={labelStyle}
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
                    color: selectedMajors.includes(option.category)
                      ? "#47B5FF"
                      : "#F7EFFF",
                  }}
                  checked={selectedMajors.includes(option.category)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        majorChoice: option.category,
                      }));
                    } else {
                      setFormData((prev) => ({ ...prev, majorChoice: "" }));
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
                  color: selectedMajors.includes("other")
                    ? "#47B5FF"
                    : "#F7EFFF",
                }}
                checked={selectedMajors.includes("other")}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedMajors((prev) => [...prev, "other"]);
                  } else {
                    setSelectedMajors((prev) =>
                      prev.filter((val) => val !== "other")
                    );
                    setOtherMajor(""); // Clear the input when "other" is unchecked
                  }
                }}
              />
            }
            label="אחר:"
          />
          {selectedMajors.includes("other") && (
            <Input
              name="majorChoiceOther"
              value={formData.majorChoiceOther}
              onChange={(e) => setOtherMajor(e.target.value)}
              placeholder="מקצועות בגרות נוספים"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
