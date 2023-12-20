import styles from "@/styles/StartDetails.module.css";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
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
  programming5: string;
  programming6: string;
  computational7: string;
  computational8: string;
};

const emptyTest: KnowledgeTestData = {
  space1: "",
  space2: "",
  space3: "",
  space4: "",
  programming5: "",
  programming6: "",
  computational7: "",
  computational8: "",
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
    setKnowledgeTestData(formData);
    router.push("/registration/signmeup");
  };

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>שלב 3: שאלון ידע</div>
      <div className={styles.text}>
        נתחיל עם חימום קצר שיעזור לנו להגיע מוכנות.ים יותר ללמידה של הנושאים
        החדשים
        <br />
        המטרה היא לא לדעת הכל - אלא לענות לפי הידע הנוכחי שלכן.ם. &nbsp;
        {/*   בשאלון המופיע בעמוד הזה ישנן שאלות ידע, השאלות האלה יעזרו לי להבין מה
        הידע איתו אתן.ם מגיעות.ים ולהשוות לידע אותו תרכשו בעזרת הקורס.
        <br />
        תודה על שיתוף הפעולה &nbsp; */}
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
            1. מי מהבאים אינו כוכב לכת במערכת השמש?
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
            2. כמה פלנטות נמצאות במערכת השמש?
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
              label={"5"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"6"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"7"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"8"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"9"}
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
            3. כמה זמן לוקח לכדור הארץ להשלים סיבוב סביב צירו?
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
              label={"365.25 ימים"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"12 שעות"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"24 שעות"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"30 ימים"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"שנת אור"}
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
            4. אם כדור הארץ לא היה מוטה בזווית, מה היה משתנה?
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
              label={"עונות השנה לא יתחלפו"}
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"הירח ישנה את המסלול שלו"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={"כדור הארץ יסתובב מהר יותר"}
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={"כוח הכבידה ישתנה"}
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"יהיה לילה כל הזמן"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// PROGRAMMING 5 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="programming5"
            className={styles.questionnaireLabel}
            style={labelStyleIn(4)}
          >
            5. שהייה בחלל דורשת הכנות רבות כדי ללמוד דברים חדשים שאין בהם צורך
            בכדור הארץ, אבל גם ללמוד מחדש דברים שכבר ידענו. למשל איך ללכת כדי
            להגיע ממקום למקום. <br />
            בחוסר כבידה אפשר לשלב תנועות חדשות כמו:
            <li className={styles.walkList}>
              <strong> טיפוס </strong> על הקירות - שימוש בווים הנמצאים על כל
              הקירות מסביב כדי להתקדם במסדרון, ביצוע
            </li>
            <li className={styles.walkList}>
              <strong> סלטה </strong>
              כדי לבצע פנייה ימינה או שמאלה.
            </li>
            <li className={styles.walkList}>
              <strong> דחיפה </strong>
              של הקיר - כדי לקבל תאוצה ולרחף קדימה,
            </li>
            <li className={styles.walkList}>
              <strong> תנופה </strong>
              מעלה בסולם על ידי דחיפת שלבי הסולם כדי “לעוף” מעלה.{" "}
            </li>
            <br />
            בתמונה הבאה ישנו שרטוט של מספר חדרים בתחנת חלל. אילו תנועות
            אסטרונאוטית צריכה לבצע כדי להגיע מלמטה לסולם שנמצא בצד העליון?
          </FormLabel>
          <Image
            src="/test/maze.png"
            alt="שרטוט חדרים"
            className={styles.mazeImage}
            width={150}
            height={150}
          />

          <RadioGroup
            // row
            name="programming5"
            value={formData.programming5}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(4)}
            onBlur={() => turnOffFocusIn(4)}
          >
            <FormControlLabel
              key="0"
              label={
                "תנופה > טיפוס > סלטה > תנופה > סלטה > דחיפה > תנופה בסולם"
              }
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={"טיפוס > סלטה > טיפוס > סלטה > טיפוס > סלטה > תנופה בסולם"}
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={
                "סלטה > טיפוס > דחיפה > סלטה > טיפוס > טיפוס > תנופה בסולם"
              }
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={
                "טיפוס > דחיפה > טיפוס > סלטה > טיפוס > סלטה > תנופה בסולם"
              }
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={"תנופה > סלטה > סלטה > טיפוס > סלטה > דחיפה > טיפוס"}
              value={"4"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
          <div className={styles.questionGap}></div>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 6 ////// */}
          {/* ////////////////////////////////////////// */}

          {/* ////////////////////////////////////////// */}
          {/* ////// PROGRAMMING 6 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="programming6"
            className={styles.questionnaireLabel}
            style={labelStyleIn(5)}
          >
            6. עלמה יורק היא ממש גאון ומחשבת חישובים מסובכים בראש, אבל לא ממש
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
            <code>כל_הדלק_לטיסה = מרחק_לירח + דלק_לקילומטר.</code>
            <br />
            ובסוף הדפיסה את התוצאה. היכן הטעות?
          </FormLabel>
          <RadioGroup
            // row
            name="programming6"
            value={formData.programming6}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(5)}
            onBlur={() => turnOffFocusIn(5)}
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
          {/* <FormLabel
            id="programming8"
            className={styles.questionnaireLabel}
            style={labelStyleIn(7)}
          >
            8.חברה מתקשה בזכירת רשימת שמות של דמויות חשובות בנאסא. כדי לעזור לה
            החלטת ליצור תוכנה שתבדוק אילו אותיות יכולות ליצור מילה שקל לזכור.
            <br />
            התוכנה רצה על כל מיני צירופים של אותיות מתוך השמות - ולבסוף הצליחה
            למצוא מילה בעלת משמעות! <br />
            הודעת לחברה שכל מה שהיא צריכה לזכור זה את האותיות “נוגה”!
            <br />
            מה הפקודה שצריך להפעיל על כל שם כדי למצוא את האות המתאימה?
            <br />
            <br />
            רשימת שמות הנשים: <br />
            <ul>
              <li> ננסי הולוואי</li>
              <li> ונציה גוזנלס</li>
              <li> גייל וילאנואבה</li>
              <li> הלן וקארו</li>
            </ul>
            <br />
            רשימת הפקודות האפשריות:
            <br />
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
          <div className={styles.questionGap}></div> */}
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 9 ////// */}
          {/* ////////////////////////////////////////// */}
          {/* <FormLabel
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
          <div className={styles.questionGap}></div> */}
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 10 ////// */}
          {/* ////////////////////////////////////////// */}
          {/* <FormLabel
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
          <div className={styles.questionGap}></div> */}
          {/* ////////////////////////////////////////// */}
          {/* ////// COMPUTATIONAL 7 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational7"
            className={styles.questionnaireLabel}
            style={labelStyleIn(6)}
          >
            7. אילו מדעניות ומדענים אתן.ם מכירות.ים? נסו להיזכר בכמה שיותר שמות,
            לא משנה באיזה תחום.
          </FormLabel>
          <Input
            name="computational7"
            value={formData.computational7}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(6)}
            onBlur={() => turnOffFocusIn(6)}
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
          {/* ////// COMPUTATIONAL 8 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational8"
            className={styles.questionnaireLabel}
            style={labelStyleIn(7)}
          >
            8. התקבלת לתוכנית מיוחדת שתכלול שהות של חודש בתחנת החלל הבינלאומית!
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
                  לשעבר. כמו כן, ישנו אסטרואיד על שמה.
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
            name="computational8"
            value={formData.computational8}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(7)}
            onBlur={() => turnOffFocusIn(7)}
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
          // disabled={!isFilledOut(formData)} // TODO - needs to be disabled
        >
          סיימנו את החלק הקשה! עכשיו נשאר רק ליצור משתמש לאתר!
        </Button>
      </form>
    </div>
  );
}
