import styles from "@/styles/StartDetails.module.css";
import { Button, TextField, Divider, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
import { AlertColor } from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createAuthUser, createUserDocumentFromAuth } from "../utils/firebase";
import useStore from "@/utils/store";
import { doc, getDoc } from "firebase/firestore";

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

export default function SignUp() {
  const router = useRouter();
  const stateStore = useStore();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmedPassword) {
      setSnackbarMessage("הסיסמאות אינן תואמות");
      setSnackbarSeverity("error");
      return;
    }
    try {
      const response = await createAuthUser(email, password); // TODO - update all information from the forms
      //throw new Error("auth/invalid-email"); // Manual error
      //alerts:
      console.log("YAY!!!! User created successfully!", response);
      setSnackbarMessage("User created successfully!");
      setSnackbarSeverity("success");
      //update store:
      const userDocRef = await createUserDocumentFromAuth(response);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        stateStore.logIn();
        stateStore.setCurrentChapter(1);
        stateStore.setCurrentLesson(0);
        stateStore.setProfession(""); //TODO - UPDATE from forms
        stateStore.setGender("F"); //TODO - UPDATE from forms
      }

      //clean up and continue
      resetFormFields();
      setTimeout(() => {
        router.push("/course/1");
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
      <div className={styles.contentHeadline}>
        שלב 4 (ואחרון) - יצירת משתמש, שמירה וכניסה למערכת
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
          type="submit"
        >
          כניסה
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
