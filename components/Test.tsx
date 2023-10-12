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

export type KnowledgeTestData = {
  space1: string;
  space2: string;
  space3: string;
  space4: string;
  space5: string;
  space6: string;
  programming7: string;
  programming8: string;
  computational9: string;
  computational10: string;
  computational11: string;
  computational12: string;
};

const emptyTest: KnowledgeTestData = {
  space1: "",
  space2: "",
  space3: "",
  space4: "",
  space5: "",
  space6: "",
  programming7: "",
  programming8: "",
  computational9: "",
  computational10: "",
  computational11: "",
  computational12: "",
};

const isFilledOut = (fd: KnowledgeTestData): boolean =>
  Object.values(fd).every((v) => v.length > 0);

export default function Questionnaire() {
  const router = useRouter();
  const setKnowledgeTestData = useStore((state) => state.setKnowledgeTestData);

  //css
  //all form
  const [isFocused, setIsFocused] = useState<boolean[]>(Array(12).fill(false));
  const labelStyleIn = (idx: number) =>
    isFocused[idx] ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const [formData, setFormData] = useState<KnowledgeTestData>(emptyTest);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); //TODO - delete
    setKnowledgeTestData(formData);
    router.push("/registration/signmeup");
  };

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>שלב 3: שאלון ידע</div>
      <div className={styles.text}>
        בשאלון המופיע בעמוד הזה ישנן שאלות ידע, השאלות האלה יעזרו לי להבין מה
        הידע איתו אתן.ם מגיעות.ים ולהשוות לידע אותו תרכשו בעזרת הקורס.
        <br />
        תודה על שיתוף הפעולה &nbsp;
        <span className={styles.iconSmiley}>
          <i className="fa-regular fa-face-grin-stars"></i>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 1 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space1"
            className={styles.questionnaireLabel}
            style={labelStyleIn(0)}
          >
            1. איזו פלנטה מהבאות לא נמצאת במערכת השמש?
          </FormLabel>
          <RadioGroup
            // row
            name="space1"
            value={formData.space1}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(0)}
            onBlur={() => turnOffFocusIn(0)}
          >
            <FormControlLabel
              key="0"
              label={"מאדים"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"נפטון"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"טיטאן"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"נוגה"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"רהב"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 2 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space2"
            className={styles.questionnaireLabel}
            style={labelStyleIn(1)}
          >
            2. מה החשיבות של שכבת האוזון לחיים על פני כדור הארץ?
          </FormLabel>
          <RadioGroup
            // row
            name="space2"
            value={formData.space2}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(1)}
            onBlur={() => turnOffFocusIn(1)}
          >
            <FormControlLabel
              key="0"
              label={"היא מייצרת חמצן לנשימה"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"היא שומרת על החום של כדור הארץ"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"היא מגינה מפני קרני UV המגיעות מהשמש"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"היא מייצרת גשם"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"היא מווסתת את האקלים ושומרת מפני הההתחממות הגלובלית"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 3 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space3"
            className={styles.questionnaireLabel}
            style={labelStyleIn(2)}
          >
            3. אם היה לך משקל על הירח, מה הוא היה מראה לעומת המשקל בכדור הארץ?
          </FormLabel>
          <RadioGroup
            // row
            name="space3"
            value={formData.space3}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(2)}
            onBlur={() => turnOffFocusIn(2)}
          >
            <FormControlLabel
              key="0"
              label={"המשקל גבוה יותר בירח"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"המשקל קטן יותר על פני הירח"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"המשקל לא ישתנה"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"בירח כולם חסרי משקל"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"המשקל ישתנה כתלות באיזור בירח בו נשקלים"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 4 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space4"
            className={styles.questionnaireLabel}
            style={labelStyleIn(3)}
          >
            4. לאילו מכוכבי הלכת הבאים יש כוח כבידה דומה לזה של כדור הארץ?
          </FormLabel>
          <RadioGroup
            // row
            name="space4"
            value={formData.space4}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(3)}
            onBlur={() => turnOffFocusIn(3)}
          >
            <FormControlLabel
              key="0"
              label={"נוגה"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"מאדים"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"צדק"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"שבתאי"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"אורון"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 5 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space5"
            className={styles.questionnaireLabel}
            style={labelStyleIn(4)}
          >
            5. מהו אחד האתגרים הגדולים איתו יש להתמודד בחלל?
          </FormLabel>
          <RadioGroup
            // row
            name="space5"
            value={formData.space5}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(4)}
            onBlur={() => turnOffFocusIn(4)}
          >
            <FormControlLabel
              key="0"
              label={"מחסור במזון"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"חשיפה לקרינה קוסמית"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"כח כבידה גדול מדי"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"זיהום רעש"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"קושי בתנועה בתוך תווך החלל"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 6 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space6"
            className={styles.questionnaireLabel}
            style={labelStyleIn(5)}
          >
            6. מה מהבאים לא יהיה אתגר לאסטרונאוטים בחלל?
          </FormLabel>
          <RadioGroup
            // row
            name="space6"
            value={formData.space6}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(5)}
            onBlur={() => turnOffFocusIn(5)}
          >
            <FormControlLabel
              key="0"
              label={"לנשום ללא אוויר"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"לשתות במיקרו כבידה"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"לגדל צמחים"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"לשחות בבריכה"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"להתחמק משחפי חלל"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// PROGRAMMING 7 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="programming7"
            className={styles.questionnaireLabel}
            style={labelStyleIn(6)}
          >
            7. עלמה יורק היא ממש גאון ומחשבת חישובים מסובכים בראש, אבל לא ממש
            מסתדרת עם מחשבים.
            <br />
            היא צריכה לבדוק תוכנה חדשה, וכל פעם התוצאה יוצאת שונה ממה שחישבה
            בראש.
            <br />
            התרגיל שקיבלה הוא לחשב כמה דלק צריך לטיסה לירח
            <br />
            כדי לחשב אותו היא הזינה:
            <br />
            <code>מרחק_לירח = 384400</code>
            <br />
            והיא יודעת שכל קילומטר שורף בערך 20 יחידות דלק ולכן:{" "}
            <code>דלק_לקילומטר = 20.</code>
            <br />
            ולבסוף חישבה את הכל:{" "}
            <code>כל_הדלק_לטיסה = מרחק לירח + דלק_לקילומטר.</code>
            <br />
            ובסוף הדפיסה את התוצאה. היכן הטעות?
          </FormLabel>
          <RadioGroup
            // row
            name="programming7"
            value={formData.programming7}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(6)}
            onBlur={() => turnOffFocusIn(6)}
          >
            <FormControlLabel
              key="0"
              label={"עליה לשנות את האופרטור מחיבור לכפל"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={
                "יש לה טעות במספר יחידות הדלק ועליה לחזור לוודא את הנתונים"
              }
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"עדיף שתעגל את המספרים משום שהמרחק לירח לא קבוע"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"הכל נראה נכון, הטעות כנראה בהדפסה"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={
                "חסר לה מידע על תנאי השיגור כדי לקבוע את כמות הדלק הנדרשת."
              }
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// PROGRAMMING 8 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="programming8"
            className={styles.questionnaireLabel}
            style={labelStyleIn(7)}
          >
            8. כדי לעזור לחברה שלומדת על נשים בנאס”א, מצאת דרך לעזור לה לזכור את
            שמות הנשים הבאות: <br />
            <ul>
              <li> ננסי הולוואי</li>
              <li> ונציה גוזנלס</li>
              <li> גייל וילאנואבה</li>
              <li> הלן וקארו</li>
            </ul>
            כל מה שהיא צריכה לזכור זה “נוגה”!
          </FormLabel>
          <RadioGroup
            // row
            name="programming8"
            value={formData.programming8}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(7)}
            onBlur={() => turnOffFocusIn(7)}
          >
            <FormControlLabel
              key="0"
              label={"name[-1]"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"name[0]"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"name[1]"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"name[2]"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"name[4]"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 9 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational9"
            className={styles.questionnaireLabel}
            style={labelStyleIn(8)}
          >
            9. במשימה האחרונה שלך הצלחת לגלות למה מערכת טיהור השתייה לא עובדת,
            עבדת בשיטתיות ושאלת את השאלות הבאות:
            <div className={styles.questionDetails}>
              <ul>
                <li>
                  איך יצאו מים נקיים שנכנסים למערכת? מלוכלכים או שישארו נקיים?
                </li>
                <li>
                  שליחת דגימה מהמים ה”מלוכלכים” לצוות אחר. אולי יש משהו שונה
                  בדגימה הזו? אולי משהו בהרכב שונה?{" "}
                </li>
                <li>
                  התחלת התהליך והפסקה שלו באמצע, האם המים טוהרו חלקים? האם כל
                  השלבים עד עכשיו עבדו?{" "}
                </li>
                <li> האם כל המערכת שלמה? אולי יש סדקים?</li>
              </ul>
              לאור ההצלחה, קראו לך לעזרה בבעיה נוספת: מערכת התקשורת לא עובדת כמו
              שצריך, נשמע שאפשר לשלוח ולקבל הודעות אבל הכל נשמע כמו רעש סטטי.
              <br />
              אילו שאלות אפשר לשאול הפעם? האם יש לך רעיונות לפעולות שאפשר לעשות
              כדי למצוא את הבעיה?
            </div>
          </FormLabel>
          <Input
            name="computational9"
            value={formData.computational9}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(8)}
            onBlur={() => turnOffFocusIn(8)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(8).color,
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "rtl",
            }}
          />
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 10 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational10"
            className={styles.questionnaireLabel}
            style={labelStyleIn(9)}
          >
            10. משדר הוידאו של ספינת החלל מקולקל ולא מצליח לתקשר יותר עם כדור
            הארץ. אנחנו בכדור הארץ, צריכים את התקשורת הזאת עבור תמרון מאתגר אשר
            צריך להתבצע בקרוב. בגלל שלוקח לכל הודעה 15 דקות להגיע לחללית (ועוד
            15 דקות להגיע חזרה לכדור הארץ) נרצה להכין הודעה קולית מפורטת ככל
            האפשר.
            <div className={styles.questionDetails}>
              <ul>
                ידוע לנו ש:
                <li>
                  כדי לתקן את המשדר, לפחות שני אסטרונאוטים צריכים לבצע "הליכת
                  חלל".{" "}
                </li>
                <li>
                  איש צוות צריך להיות מוכן לעזור לאסטרונאוטים שיוצאים ללבוש את
                  חליפת החלל ואח”כ לצאת ממנה.
                </li>
                <li>
                  צריך שיהיה מישהו ליד משדר הרדיו כדי לקבל ולשלוח הודעות בין כל
                  אנשי הצוות (וכדור הארץ)
                </li>
                <li> עמדת ההגאים צריכה להיות מאוישת כל הזמן</li>
                <li> גם עמדת הניווט צריכה להיות מאוישת כל הזמן</li>
                <li> לכל אנשי הצוות התמחות בשני תפקידים</li>
              </ul>
              <ol>
                הצוות שלנו כולל את ההתמחויות הבאות:
                <li>טייסת ומהנדסת</li>
                <li>מהנדס וביולוג</li>
                <li>נווטת ורופאה</li>
                <li>נווט ופיזיקאי</li>
                <li>טכנאית ומהנדסת מערכות אוויר ונשימה</li>
                <li>טייס וטכנאי רדיו</li>
              </ol>
              איזו הודעה אפשר לשלוח כדי לעזור לצוות בחלל לתקן את משדר הוידאו
              בצורה הטובה ביותר?
            </div>
          </FormLabel>
          <Input
            name="computational10"
            value={formData.computational10}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(9)}
            onBlur={() => turnOffFocusIn(9)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(9).color,
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "rtl",
            }}
          />
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 11 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational11"
            className={styles.questionnaireLabel}
            style={labelStyleIn(10)}
          >
            11. אילו מדעניות ומדענים אתן.ם מכירות.ים? נסו להיזכר בכמה שיותר
            שמות, לא משנה באיזה תחום.
          </FormLabel>
          <Input
            name="computational11"
            value={formData.computational11}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(10)}
            onBlur={() => turnOffFocusIn(10)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(10).color,
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "rtl",
            }}
          />
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 12 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational12"
            className={styles.questionnaireLabel}
            style={labelStyleIn(11)}
          >
            12. התקבלת לתוכנית מיוחדת שתכלול שהות של חודש בתחנת החלל הבינלאומית!
            לפני פגישה עם הצוות עלייך להכין רשימת שאלות, מה תשאל.י?
            <div className={styles.questionDetails}>
              <ol>
                אנשי הצוות שיגיעו לפגישה:
                <li>
                  ג'סיקה מאיר - אסטרונאוטית אמריקאית ממוצא יהודי-ישראלי, דוקטור
                  לביולוגיה ימית, ופיזיולוגית.
                </li>
                <li>
                  פסקל ארנפרוינד - נשיאת אוניברסיטת החלל הבינלאומית, נשיאת
                  הפדרציה הבינלאומית לאסטרונאוטיקה, מנכ"לית סוכנות החלל הגרמנית
                  לשעבר כמו כן ישנו אסטרואיד על שמה.
                </li>
                <li>
                  איתן סטיבה - הישראלי השני ששהה בחלל, הראשון בתחנת החלל
                  הבינלאומית ותייר החלל הישראלי הראשון. הוא המריא לחלל כחבר-צוות
                  ב"משימת רקיע".
                </li>
              </ol>
            </div>
          </FormLabel>
          <Input
            name="computational12"
            value={formData.computational12}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(11)}
            onBlur={() => turnOffFocusIn(11)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(11).color,
              borderWidth: "0px",
              borderBottomWidth: "1px",
              borderStyle: "solid",
              direction: "rtl",
            }}
          />
          <div className={styles.questionGap}></div>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          type="submit"
          className={styles.AgreeButton}
          disabled={false} //{!isFilledOut(formData)}// TODO - needs to be disabled
        >
          סיימנו את החלק הקשה! עכשיו נשאר רק ליצור משתמש לאתר!
        </Button>
      </form>
    </div>
  );
}
