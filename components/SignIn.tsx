import styles from "@/styles/StartDetails.module.css";
import { Button, TextField, Divider, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { initGroups, signInUser } from "../utils/firebase";
import { AlertColor } from "@mui/material/Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createAuthUser, createUserDocumentFromAuth } from "../utils/firebase";
import useStore from "@/utils/store";
import { doc, getDoc } from "firebase/firestore";

const signInFormFields = { email: "", password: "" };

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
  "& .MuiInputLabel-outlined": {
    // transform: "translate(140px, 14px) scale(1)", // Adjust the first value (translateX) to move the label left or right
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(20px, -12px)",
    // The "14px" shifts the label to the right. Adjust this value as needed.
  },
  "& .MuiOutlinedInput-input": {
    padding: "15px 14px",
    // Increase the "15px" value to create more vertical space (height)
    // Adjust the "14px" value for horizontal space (width)
  },
  "& .MuiOutlinedInput-notchedOutline": {
    // Adjust the values here to control the size of the notch
    // borderTopRightRadius: "0",
    // borderTopLeftRadius: "0",
    // clipPath: "inset(0 15px 0 15px)", // This controls the hole width. Increase the 15px values to make the hole wider.
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    // clipPath: "inset(0 10px 0 10px)", // This is for the focused state, adjust accordingly
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline legend":
    {
      width: "auto", // Reset any hardcoded width
      padding: "0 8px", // Adjust the padding to make the hole larger or smaller
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

export default function SignIn() {
  const router = useRouter();
  const stateStore = useStore();
  // Removed emailFocused and passwordFocused state
  const [formFields, setFormFields] = useState(signInFormFields);
  const { email, password } = formFields;
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | null>(
    null
  );

  // Checked log-in
  useEffect(() => {
    // Check if user is logged in
    if (stateStore.isLoggedIn) {
      router.push(`/course/${stateStore.currentChapter}`);
    } else {
      stateStore.deleteEverything();
    }
  }, [stateStore.isLoggedIn]);

  const resetFormFields = () => {
    setFormFields(signInFormFields);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await signInUser(email, password);
      // throw new Error("auth/invalid-email"); // Manual error
      // alerts //
      console.log("YAY!!!! User enteres successfully!");
      setSnackbarMessage("User created successfully!");
      setSnackbarSeverity("success");

      //update store:
      const userDocRef = await createUserDocumentFromAuth(response);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        stateStore.logIn();

        stateStore.setCurrentChapter(docSnap.data().currentChapter);
        stateStore.setCurrentLesson(docSnap.data().currentLesson);
        stateStore.setProfession(docSnap.data().profession);
        stateStore.setGender(docSnap.data().gender);
        stateStore.setGroup(docSnap.data().group);
      }

      // clean fields and move to course
      resetFormFields();
      setTimeout(() => {
        router.push(`/course/${stateStore.currentChapter}`);
      }, 400);
    } catch (error) {
      console.error("Error Code:", (error as any).message);
      const friendlyMessage = getFriendlyMessage((error as any).code);
      setSnackbarMessage(friendlyMessage);
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.contentHeadline}>חזרת? הכניסה מפה:</div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.textFieldContainer}>
          <StyledTextField
            fullWidth
            required
            id="email"
            label="דואר אלקטרוני"
            margin="normal"
            // style={{ outline: "none", border: "none", boxShadow: "none" }}
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

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          type="submit"
        >
          כניסה
        </Button>
      </form>

      <Divider
        style={{
          width: "70%",
          margin: "40px 0px",
          padding: "0",
          backgroundColor: "#47B5FF",
          height: "1px",
          opacity: 1,
          visibility: "visible",
          zIndex: 1000,
          display: "block",
        }}
      />
      <div className={styles.contentHeadline}>
        פעם ראשונה פה?
        <br />
        יש לי כמה שאלות לפני שנתחיל
      </div>
      <Link href="../registration/introduction">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px", width: "250px" }}
        >
          הרשמה
        </Button>
      </Link>
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

// const focusLabelStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "5px", // Adjust as needed.
//   left: "calc(100% - 70px)",
//   fontSize: "0.75rem",
//   background: "#142037",
//   padding: "2px 5px",
//   pointerEvents: "none",
//   zIndex: 3,
//   width: "45px",
// };
