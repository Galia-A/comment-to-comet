import styles from "@/styles/StartDetails.module.css";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { styled } from "@mui/system";
import { AlertColor } from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react";
import {
  addUserData,
  addUserToGroup,
  createAuthUser,
  createUserDocumentFromAuth,
} from "../utils/firebase";
import useStore from "@/utils/store";
import { getDoc } from "firebase/firestore";

const signUpFormFields = { email: "", password: "", confirmedPassword: "" };

const getAlertBackgroundColor = (severity: AlertColor | null) => {
  switch (severity) {
    case "success":
      return "#4CAF50"; // A nice green
    case "error":
      return "#F44336"; // A nice red
    default:
      return ""; // Default background color
  }
};

// Moved outside the SignUp function to avoid redefinition on every render
const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#F7EFFF",
  },
  "& .MuiInputBase-root": {
    color: "#F7EFFF", // Text color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#47B5FF",
    },
    "&:hover fieldset": {
      borderColor: "#47B5FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#47B5FF",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#F7EFFF", // Label color when it's not focused
    right: "30px",
  },
  "& .MuiInputBase-input": {
    paddingRight: "10px", // Add some padding to the right side of the input, adjust as needed
    textAlign: "left", // Align text to the left
    direction: "ltr", // Set text direction to LTR
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(20px, -12px)",
  },
  "& .MuiOutlinedInput-input": {
    padding: "15px 14px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline legend":
    {
      width: "auto", // Reset any hardcoded width
      padding: "0 8px", // Adjust the padding to make the hole larger or smaller
    },
});
const WhiteRadio = styled(Radio)({
  "& .MuiSvgIcon-root": {
    color: "#F7EFFF",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#47B5FF",
  },
});

function getFriendlyMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      return "כתובת האי-מייל שהזנת כבר רשומה במערכת";
    case "auth/invalid-email":
      return "כתובת האי-מייל לא כתובה בפורמט המתאים";
    case "auth/invalid-login-credentials":
      return "כתובת האי-מייל או הסיסמה לא תואמים";
    case "auth/weak-password":
      return "הסיסמה חלשה מדי";
    default:
      return "התרחשה שגיאה לא ידועה. נסו שנית או פנו למנהלת האתר";
  }
}

const isFilledOut = (
  profession: string,
  formFields: Record<string, string>
): boolean =>
  profession.length > 0 && Object.values(formFields).every((v) => v.length > 0);

export default function SignUp() {
  const router = useRouter();
  const stateStore = useStore();
  const gender = stateStore.gender;

  const [isFocused, setIsFocused] = useState(false);

  const [profession, setProfession] = useState("");
  const [formFields, setFormFields] = useState(signUpFormFields);
  const { email, password, confirmedPassword } = formFields;
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | null>(
    null
  );

  // Checked log-in
  useEffect(() => {
    // Check if user is logged in
    if (stateStore.isLoggedIn) {
      router.push(`/course/${stateStore.currentChapter}`);
    }
  }, [stateStore.isLoggedIn]);

  const resetFormFields = () => {
    setFormFields(signUpFormFields);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleProfessionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = event.target.name ?? "";
    setProfession(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmedPassword) {
      setSnackbarMessage("הסיסמאות אינן תואמות");
      setSnackbarSeverity("error");
      return;
    }

    try {
      const response = await createAuthUser(email, password);
      //throw new Error("auth/invalid-email"); // Manual error
      //alerts:
      console.log("YAY!!!! User created successfully!", response);
      setSnackbarMessage("תהליך הרישום הסתיים - מיד נכנסים");
      setSnackbarSeverity("success");
      const { userDocRef, uid } = await createUserDocumentFromAuth(response);
      const docSnap = await getDoc(userDocRef);

      //update store:
      if (docSnap.exists()) {
        stateStore.logIn(uid);
        stateStore.setCurrentChapter(1);
        stateStore.setCurrentLesson(0);
        stateStore.setProfession(profession);

        //get group
        const { userObject, groupId } = await addUserToGroup(
          gender,
          profession
        );
        stateStore.setPosition(userObject.position);
        stateStore.setGroup(groupId);

        const allData = {
          ...stateStore.questionnaire,
          ...stateStore.knowledgeTest,
        };
        // console.log("allData", allData);
        await addUserData(userDocRef, {
          ...allData,
          gender,
          profession,
          groupPosition: userObject.position,
          currentChapter: 1,
          currentLesson: 0,
          group: groupId,
        });
        console.log("Added to Firestore, hopefully...");
      }

      //clean up and continue
      resetFormFields();
      setTimeout(() => {
        router.push("/course/1");
      }, 400);
    } catch (error) {
      console.error(
        "Error Code:",
        (error as any).code,
        " : ",
        (error as any).message
      );
      const friendlyMessage = getFriendlyMessage((error as any).code);
      setSnackbarMessage(friendlyMessage);
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className={`${styles.content} `}>
      <div className={styles.contentHeadline}>
        שלב 4 (ואחרון) - יצירת משתמש, שמירה וכניסה למערכת
      </div>
      <form className={` ${styles.wideBorder}`} onSubmit={handleSubmit}>
        {/* ////////////////////////////////////////// */}
        {/* ////// User Profession ////// */}
        {/* ////////////////////////////////////////// */}
        <div className={`${styles.questionMediumWidth}`}>
          <div className={styles.text}>
            רגע לפני שתבחרו שם משתמש וסיסמה, שאלה אחרונה (מבטיחה)!
          </div>
          <FormLabel
            id="space1"
            className={styles.questionnaireLabel}
            style={{ color: isFocused ? "#47B5FF" : "#F7EFFF" }}
          >
            יצאת למסע למאדים, ופתאום מופיע חייזר מה התגובה שלך?
          </FormLabel>
          <RadioGroup
            // row
            name="space1"
            value={profession}
            onChange={handleProfessionChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <FormControlLabel
              key="0"
              label={
                gender == "F"
                  ? "את מוציאה את הסמארטפון ומתחילה לתעד, דואגת שיהיה לך כמה שיותר מידע מוסיפה הערות והשערות תוך כדי. "
                  : "אתה מוציא את הסמארטפון ומתחיל לתעד, דואג שיהיה לך כמה שיותר מידע. מוסיף הערות והשערות תוך כדי."
              }
              value={gender == "F" ? "מדענית" : "מדען"}
              control={<WhiteRadio />}
            />
            <div className={styles.professionRadioGap}></div>
            <FormControlLabel
              key="1"
              label={
                gender == "F"
                  ? "עזבו את החייזר, ממה עשויה החליפה שלו? ואיך החללית שלו צפה ככה באוויר? את כבר עם 10 שאלות בראש!"
                  : "עזבו את החייזר, ממה עשויה החליפה שלו? ואיך החללית שלו צפה ככה באוויר? אתה כבר עם 10 שאלות בראש!"
              }
              value={gender == "F" ? "מהנדסת" : "מהנדס"}
              control={<WhiteRadio />}
            />
            <div className={styles.professionRadioGap}></div>
            <FormControlLabel
              key="2"
              label={
                gender == "F"
                  ? "איפה חליפת החלל שלך? את יוצאת לפגוש אותו! מה שמעניין אותך זה מאיפה הגיע? איפה שאר האוכלוסיה? האם הוא מכיר מקומות לצפייה בשקיעה? "
                  : "איפה חליפת החלל שלך? אתה יוצאת לפגוש אותו! מה שמעניין אותך זה מאיפה הגיע? איפה שאר האוכלוסיה? האם הוא מכיר מקומות לצפייה בשקיעה? "
              }
              value={gender == "F" ? "חלוצה" : "חלוץ"}
              control={<WhiteRadio />}
            />
          </RadioGroup>
        </div>
        <div className={styles.questionGap}></div>
        {/* ////////////////////////////////////////// */}
        {/* ////// Sign Up ////// */}
        {/* ////////////////////////////////////////// */}
        <div className={styles.textFieldContainer}>
          <StyledTextField
            fullWidth
            required
            id="email"
            label="דואר אלקטרוני"
            margin="normal"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.textFieldContainer}>
          <StyledTextField
            fullWidth
            required
            id="password"
            label="סיסמה"
            margin="normal"
            type="password"
            variant="outlined"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.textFieldContainer}>
          <StyledTextField
            fullWidth
            required
            id="passwordconfirmed"
            label="סיסמה - שוב"
            margin="normal"
            type="password"
            variant="outlined"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={handleChange}
          />
        </div>
        {/* Removed Link from here. Instead, navigate programmatically after validation and other logic. */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          className={styles.AgreeButton}
          type="submit"
          disabled={!isFilledOut(profession, formFields)}
        >
          מתחילים!
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarMessage !== null}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
        className={styles.centeredSnackbar}
      >
        <Alert
          onClose={() => setSnackbarMessage(null)}
          severity={snackbarSeverity ?? undefined} // Use the nullish coalescing operator here
          style={{
            backgroundColor: getAlertBackgroundColor(snackbarSeverity),
            color: "#FFFFFF",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
