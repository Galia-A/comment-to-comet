import styles from "@/styles/TopMenu.module.css";
import logo from "../public/logo.png";
import Image from "next/image";

export default function TopMenu() {
  return (
    /* Top Menu */
    <div className={styles.topMenu}>
      <span>
        <Image src={logo} alt="site logo" className={styles.topLogo} />
      </span>
      <span className={styles.title}> חשיבה מחשובית בחלל</span>
    </div>
  );
}
