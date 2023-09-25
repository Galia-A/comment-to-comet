import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHqBjQFK-Lz7M-_dHurWtIxpxYbZwnxy8",
  authDomain: "comment-to-comet.firebaseapp.com",
  projectId: "comment-to-comet",
  storageBucket: "comment-to-comet.appspot.com",
  messagingSenderId: "821788805336",
  appId: "1:821788805336:web:fc2a61e0d4a9d634a32fad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

type AdditionalInfo = {};

export const createUserDocumentFromAuth = async (
  userCred: UserCredential,
  additionalInformation: AdditionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userCred.user.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if not exists
  if (!userSnapshot.exists()) {
    const { email } = userCred.user;
    const createdAt = new Date();

    await setDoc(userDocRef, { email, createdAt, ...additionalInformation });
  }
  return userDocRef;
};
export const createAuthUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email or Password is missing!");
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error; // We throw the error here to handle it in the component later.
  }
};
export const signInUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email or Password is missing!");
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error; // We throw the error here to handle it in the component later.
  }
};

export const logOutFirebase = async () => {
  await signOut(auth);
};
