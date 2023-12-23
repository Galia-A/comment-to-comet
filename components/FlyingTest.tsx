import styles from "@/styles/StartDetails.module.css";
import { ChangeEvent, useState, useEffect } from "react";
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
import { addUserDataB } from "@/utils/firebase";

const WhiteRadio = styled(Radio)({
  "& .MuiSvgIcon-root": {
    color: "#F7EFFF",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#47B5FF",
  },
});

export type KnowledgeTestDataB = {
  space1B: string;
  space2B: string;
  space3B: string;
  space4B: string;
  programming5B: string;
  programming6B: string;
  computational7B: string;
  computational8B: string;
};

const emptyTest: KnowledgeTestDataB = {
  space1B: "",
  space2B: "",
  space3B: "",
  space4B: "",
  programming5B: "",
  programming6B: "",
  computational7B: "",
  computational8B: "",
};

const isFilledOut = (fd: KnowledgeTestDataB): boolean =>
  Object.values(fd).every((v) => v.length > 0);

function matrixToRecords<T>(xss: T[][]): Record<string, T>[] {
  return xss.map((xs) => {
    const res: Record<string, T> = {};
    for (const [k, v] of Object.entries(xs)) {
      res[k] = v;
    }
    return res;
  });
}

export default function Questionnaire() {
  const router = useRouter();
  const stateStore = useStore();

  // Checked log-in
  useEffect(() => {
    // Check if user is logged in
    if (!stateStore.isLoggedIn) {
      router.push(`/`);
    }
  }, [stateStore.isLoggedIn]);

  const setKnowledgeTestDataB = useStore(
    (state) => state.setKnowledgeTestDataB
  );

  //css
  //all form
  const [isFocused, setIsFocused] = useState<boolean[]>(Array(12).fill(false));
  const labelStyleIn = (idx: number) =>
    isFocused[idx] ? { color: "#47B5FF" } : { color: "#F7EFFF" };

  const [formData, setFormData] = useState<KnowledgeTestDataB>(emptyTest);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKnowledgeTestDataB(formData);

    try {
      const allData = {
        ...stateStore.questionnaireB,
        ...formData,
        answersSingle: matrixToRecords(stateStore.singleProgrammingAnswers),
        answersGroup: stateStore.groupProgramingAnswers,
        answersPracticeA: matrixToRecords(
          stateStore.practiceAProgrammingAnswers
        ),
        answersPracticeB: matrixToRecords(
          stateStore.practiceBProgrammingAnswers
        ),
        createdAt2: new Date(),
      };

      await addUserDataB(stateStore.uid!, {
        ...allData,
      });
      //console.log("Added to Firestore, hopefully...");

      setTimeout(() => {
        router.push("/flying/flyingcolors");
      }, 400);
    } catch (error) {
      console.error(
        "Error Code:",
        (error as any).code,
        " : ",
        (error as any).message
      );
    }
  };

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>שלב 3: שאלון ידע</div>
      <br />
      <div className={styles.text}>
        גם השאלון הזה יהיה מוכר - יש לענות עליו שוב - לפי הידע הנוכחי שלך &nbsp;
        <span className={styles.iconSmiley}>
          <i className="fa-regular fa-face-grin-stars"></i>
        </span>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <FormControl>
          {/* ////////////////////////////////////////// */}
          {/* ////// SPACE 1 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="space1B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(0)}
          >
            1. מי מהבאים אינו כוכב לכת במערכת השמש?
          </FormLabel>
          <RadioGroup
            // row
            name="space1B"
            value={formData.space1B}
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
            id="space2B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(1)}
          >
            2. כמה פלנטות נמצאות במערכת השמש?
          </FormLabel>
          <RadioGroup
            // row
            name="space2B"
            value={formData.space2B}
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
            id="space3B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(2)}
          >
            3. כמה זמן לוקח לכדור הארץ להשלים סיבוב סביב צירו?
          </FormLabel>
          <RadioGroup
            // row
            name="space3B"
            value={formData.space3B}
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
            id="space4B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(3)}
          >
            4. אם כדור הארץ לא היה מוטה בזווית, מה היה משתנה?
          </FormLabel>
          <RadioGroup
            // row
            name="space4B"
            value={formData.space4B}
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
            id="programming5B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(4)}
          >
            5. שהייה בחלל דורשת הכנות רבות כדי ללמוד דברים חדשים שאין בהם צורך
            בכדור הארץ, אבל גם ללמוד מחדש דברים שכבר ידענו. למשל איך ללכת כדי
            להגיע ממקום למקום. <br />
            בחוסר כבידה אפשר לשלב תנועות חדשות כמו:
            <li className={styles.walkList}>
              <strong> הליכת ספיידרוומן - </strong> כדי להתקדם ישר - משתמשים
              בווים שנמצעים על הקירות.
            </li>
            <li className={styles.walkList}>
              <strong> סלטה - </strong>
              כדי לבצע פנייה ימינה או שמאלה.
            </li>
            <li className={styles.walkList}>
              <strong> דחיפת דלת - </strong>
              החזקת צידי הדלת וקבלת תנופה פנימה.
            </li>
            <li className={styles.walkList}>
              <strong> משיכה בשלבים - </strong>
              משיכה בשלבי סולם כדי לקבל תנופה כלפי מעלה ו-"לעוף".
            </li>
            <br />
            השרטוט הבא מציג חתך של אחת הקומות בתחנת החלל. הכניסה לקומה הזו היא
            דרך דלת הנמצאת בצידו התחתון של השרטוט. אסטרונאוטית נכנסת לחדר ויוצאת
            דרך סולם אל הקומה השנייה.
            <br />
            מה יכולות להיות התנועות שהאסטרונאוטית מבצעת?
          </FormLabel>
          <Image
            src="/test/maze2.png"
            alt="שרטוט חדרים"
            className={styles.mazeImage}
            width={180}
            height={180}
          />

          <RadioGroup
            // row
            name="programming5B"
            value={formData.programming5B}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(4)}
            onBlur={() => turnOffFocusIn(4)}
          >
            <FormControlLabel
              key="0"
              label={
                "דחיפת דלת > סלטה> סלטה > דחיפת דלת > הליכת ספיידרוומן > סלטה > סלטה > הליכת ספיידרוומן > משיכה בשלבים"
              }
              value={"0"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="1"
              label={
                "דחיפת דלת > הליכת ספיידרוומן > סלטה > הליכת ספיידרוומן > סלטה > הליכת ספיידרוומן > סלטה > הליכת ספיידרוומן > משיכה בשלבים"
              }
              value={"1"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="2"
              label={
                "דחיפת דלת > סלטה > הליכת ספיידרוומן > סלטה > משיכה בשלבים > הליכת ספיידרוומן > סלטה > דחיפת דלת > משיכה בשלבים"
              }
              value={"2"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="3"
              label={
                "דחיפת דלת > משיכה בשלבים > סלטה > הליכת ספיידרוומן > סלטה > דחיפת דלת > הליכת ספיידרוומן > סלטה > משיכה בשלבים"
              }
              value={"3"}
              control={<WhiteRadio />}
            />
            <FormControlLabel
              key="4"
              label={
                "דחיפת דלת > הליכת ספיידרוומן > משיכה בשלבים > סלטה > דחיפת דלת > הליכת ספיידרוומן > סלטה > משיכה בשלבים > סלטה"
              }
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
            id="programming6B"
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
            name="programming6B"
            value={formData.programming6B}
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
          {/*<FormLabel
            id="programming8B"
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
            name="programming8B"
            value={formData.programming8B}
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
            id="computational7B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(6)}
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
            name="computational8B"
            value={formData.computational8B}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(7)}
            onBlur={() => turnOffFocusIn(7)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(7).color,
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
            id="computational10B"
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
            name="computational10B"
            value={formData.computational10B}
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
          {/* ////// COMPUTATIONAL 11 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational7B"
            className={styles.questionnaireLabel}
            style={labelStyleIn(6)}
          >
            7. אילו מדעניות ומדענים אתן.ם מכירות.ים? נסו להיזכר בכמה שיותר שמות,
            לא משנה באיזה תחום.
          </FormLabel>
          <Input
            name="computational7B"
            value={formData.computational7B}
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
          {/* ////// COMPUTATIONAL 12 ////// */}
          {/* ////////////////////////////////////////// */}
          <FormLabel
            id="computational8B"
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
            name="computational8B"
            value={formData.computational8B}
            onChange={handleFieldChange}
            onFocus={() => turnOnFocusIn(7)}
            onBlur={() => turnOffFocusIn(7)}
            multiline
            style={{
              marginRight: "30px",
              width: "70%",
              color: "#F7EFFF",
              borderBottomColor: labelStyleIn(7).color,
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
          disabled={!isFilledOut(formData)} // TODO - needs to be disabled
        >
          ותודה אחרונה
        </Button>
      </form>
    </div>
  );
}
