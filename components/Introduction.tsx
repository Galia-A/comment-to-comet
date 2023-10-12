import styles from "@/styles/StartDetails.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Introduction() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    router.push("/registration/questionnaire");
  };

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>החלל מחכה ואני שמחה להכיר!</div>
      <div className={styles.text}>
        אני גליה אפל, אני עובדת בעמותת תפוח כמנהלת למידה. במסגרת הלימודים שלי
        בתואר שני לטכנולוגיות למידה בסמינר הקיבוצים, אני מבצעת מחקר בקורס
        "סדנת-גמר". המחקר עוסק בלימוד והוראת מקצועות ה -STEM (Science,
        technology, engineering, and mathematics) ובאופן ספציפי בלימוד תכנות
        ומקצועות החלל.
      </div>
      <div className={styles.text}>
        במסגרת המחקר אני מתכננת לאסוף מידע הכולל פרטים דמוגרפיים, תשובות לשאלוני
        ידע, ומעקב אחרי השימוש באתר הקורס.
      </div>
      <div className={styles.text}>
        אני מתחייבת כי שימוש בפרטים הללו עבור המחקר ושיתופם עם ד"ר איילת וייצמן
        אשר מנחה את הקורס, יתבצע תוך שמירת כללים אלה:
      </div>
      <div className={styles.text}>
        <li className={styles.list}>
          הנתונים יאספו לצורכי המחקר בלבד ולא יאפשרו את זיהוי המשתתפות.ים.
        </li>
        <li className={styles.list}>
          הנתונים הגולמיים ישמרו בקבצי מחשב שהגישה אליהם תוגבל באמצעות סיסמה.
        </li>
        <li className={styles.list}>
          לא יפגעו מי שיבקשו להפסיק את ההשתתפות ולהסיר את פרטיהן.ם.
        </li>
      </div>
      <div className={styles.text}>
        בכל שלב תוכלו לבקש להפסיק את ההשתתפות במחקר על-ידי שליחת הודעת דוא"ל
        לכתובת:
        <a className={styles.mailLink} href="mailto:space.project@galia.dev">
          &nbsp; space.project@galia.dev&nbsp;
        </a>
        ואני מתחייבת להסיר ולמחוק את המידע שנאסף. כמו כן, במסגרת הפעילות תוכלו
        להתכתב עם חברי וחברות הקבוצה שלכן.ם, ההודעות יקראו על-ידי על מנת למנוע
        בריונות.
      </div>
      <div className={styles.text}>
        אם בחרתן.ם להשתתף במחקר, בבקשה ענו בצורה מפורטת ככל האפשר על המשובים.
        ואם בכל שלב אתן.ם מרגישות.ים לא בנוח, מכל סיבה שהיא, בבקשה פנו אלי
        לדוא"ל וכתבו לי על מנת שאוכל לעזור.
      </div>
      <div className={styles.text}>
        לאחר שתאשרו שקראתן.ם את התנאים, יופיעו: שאלון עמדות, שאלון ידע ולבסוף
        רישום שישמור את כל הפרטים שהזנתן.ם.
        <br />
        אין אפשרות להפסיק את התהליך באמצע והוא ייקח קצת זמן (כ-20-30 דקות) אז
        בבקשה אל תסגרו את הדפדפן וענו כמיטב יכולתכן.ם.
      </div>
      <div className={styles.text}> תודה רבה לכולכן.ם, אני מקווה שתהנו!</div>
      <div className={styles.text}>
        אל האינסוף ומעבר לו
        <span className={styles.iconShuttle}>
          <i className="fas fa-space-shuttle fa-rotate-180"></i>
        </span>
      </div>
      <div className={styles.text}> גליה</div>

      <div className={styles.agreeTerms}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label>
          אני מאשר.ת שקראתי את התנאים ואני מאשר.ת את השימוש בפרטים שלי כפי
          שנכתבו
        </label>
      </div>

      <button
        onClick={handleButtonClick}
        disabled={!isChecked}
        className={styles.AgreeButton}
      >
        נמשיך לשאלון הראשון (מתוך שניים)
      </button>
    </div>
  );
}
