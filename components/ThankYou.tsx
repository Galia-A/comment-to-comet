import styles from "@/styles/StartDetails.module.css";
import { useRouter } from "next/router";
import useStore from "@/utils/store";
import { useEffect } from "react";
import ReadAloud from "./ReadAloud";

export default function Thankyou() {
  const router = useRouter();
  const stateStore = useStore();

  // Checked log-in
  useEffect(() => {
    // Check if user is logged in
    if (!stateStore.isLoggedIn) {
      router.push(`/`);
    }
  }, [stateStore.isLoggedIn]);

  const handleButtonClick = () => {
    router.push("/flying/flyinganswers");
  };
  const gender = stateStore.gender;

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>
        <ReadAloud sndNumber={16} /> &nbsp;
        {gender === "F"
          ? "המשימה הושלמה: תודה גדולה לכולכן!"
          : "המשימה הושלמה: תודה גדולה לכולכם!"}
      </div>
      <div className={styles.text}>
        מסע אסטרונומי!
        <br />
        עשית את זה! ניווטת בחלל ובכדור הארץ, פיענחת את שפת התכנות ולקחת קפיצת
        מדרגה אחת ענקית במסע הגילוי שלך. אני מקווה שההרפתקה הזו עוררה את הסקרנות
        שלך, הרחיבה את האופקים שלך, ואולי אפילו הציתה חלומות על חקר מקומות
        רחוקים!
      </div>
      <div className={styles.text}>
        כמעט סיימנו
        <br />
        הלומדה הזו נכתבה כחלק מפרויקט לימודי, ככזו היא כוללת רק טעימה מהתוכן
        המתוכנן.
        <br />
        {gender === "F"
          ? "לפני שתתנתקי, יש לי משימה קטנה אך חשובה - בבקשה מלאי את השאלונים הבאים. המשוב שלך יעזור לי ללמוד מה עבד ומה לא עבד - ויעזור לי להפוך את הקורס למלהיב יותר עבור צוערות עתידיות."
          : "לפני שתתנתק, יש לי משימה קטנה אך חשובה - בבקשה מלא את השאלונים הבאים. המשוב שלך יעזור לי ללמוד מה עבד ומה לא עבד - ויעזור לי להפוך את הקורס למלהיב יותר עבור צוערים עתידיים."}
      </div>
      <div className={styles.text}>
        עד ההרפתקה הבאה!
        <br />
        {gender === "F"
          ? "תודה שהיית צוות כל כך מדהים! זכרי, כל חוקרת גדולה התחילה בדיוק היכן שאת נמצאת כרגע - עם סקרנות ותחושת הרפתקה. תמשיכי תמיד להביט למרחקים ולשאול שאלות!"
          : "תודה שהיית צוות כל כך מדהים! זכור, כל חוקר גדול התחיל בדיוק היכן שאתה נמצא כרגע - עם סקרנות ותחושת הרפתקה. תמשיך תמיד להביט למרחקים ולשאול שאלות!"}
      </div>
      <div className={styles.text}>
        אל האינסוף ומעבר לו
        <span className={styles.iconShuttle}>
          <i className="fas fa-space-shuttle fa-rotate-180"></i>
        </span>
        <br />
        גליה
      </div>
      <button onClick={handleButtonClick} className={styles.AgreeButton}>
        לסיכום
      </button>
    </div>
  );
}
