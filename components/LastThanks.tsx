import styles from "@/styles/StartDetails.module.css";
import { useRouter } from "next/router";
import useStore from "@/utils/store";
import { useEffect } from "react";

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

  const gender = stateStore.gender;

  return (
    <div className={`${styles.contentAligned} ${styles.wideBorder}`}>
      <div className={styles.contentHeadline}>תודה רבה!</div>
      <div className={styles.picture}>
        <img src="/flying/song.png" alt="song on wonder" />
      </div>
    </div>
  );
}
