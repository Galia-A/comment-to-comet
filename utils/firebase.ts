import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  DocumentReference,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { QuestionnaireData } from "@/components/Questionnaire";
import { KnowledgeTestData } from "@/components/Test";
import { QuestionnaireDataB } from "@/components/FlyingQuestionnaire";
import { KnowledgeTestDataB } from "@/components/FlyingTest";
import { SingleFinalAnswer, GroupFinalAnswer } from "@/pages/course/[id]";
import { AppState, Gender } from "./store";

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

// let userDocRef: DocumentReference<DocumentData, DocumentData>;

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
  return { userDocRef: userDocRef, uid: userCred.user.uid };
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

export const addUserData = async (
  docRef: DocumentReference,
  data: QuestionnaireData &
    KnowledgeTestData & {
      currentChapter: number;
      currentLesson: number;
      gender: Gender;
      profession: string;
      group: string;
      groupPosition: number;
    }
): Promise<void> => {
  // console.log("In addUserData");

  await setDoc(docRef, data);
};

export const addUserDataB = async (
  uid: string,
  data: QuestionnaireDataB &
    KnowledgeTestDataB & {
      answersSingle: SingleFinalAnswer;
      answersGroup: GroupFinalAnswer;
      answersPracticeA: SingleFinalAnswer;
      answersPracticeB: SingleFinalAnswer;
    }
): Promise<void> => {
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, data);
};

export const addMessage = async (
  newMessage: string,
  state: AppState
): Promise<void> => {
  const group = state.group.toString();
  //   const messageDocRef = doc(db, "messages", group);
  const subcollection = collection(
    db,
    "messages",
    group,
    `${state.currentChapter}_${state.currentLesson}`
  );
  await addDoc(subcollection, {
    text: newMessage,
    createdAt: serverTimestamp(),
    userId: auth.currentUser?.uid,
    displayName: state.profession,
    group: group,
    groupPosition: state.position,
    chapter: state.currentChapter,
    lesson: state.currentLesson,
    gender: state.gender,
  });
};

export const getMessagesQuery = (state: AppState) =>
  query(
    collection(
      db,
      "messages",
      state.group.toString(),
      `${state.currentChapter}_${state.currentLesson}`
    ),
    orderBy("createdAt", "asc")
  );

export const getGroupFreeSpot = async (
  gender: Gender
): Promise<{ groupId: string; groupLength: number }> => {
  // console.log("in getGroupFreeSpot!!");

  const notGroupType = gender == "M" ? "girls" : "boys";
  const querySnapshot = await getDocs(collection(db, "groups"));

  let docs: any[] = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  docs.sort((d1, d2) => Number(d1.id) - Number(d2.id));

  let groupId = "";
  let groupLength = 0;
  for (const doc of docs) {
    const data = doc.data();

    if (!data.isFull && data.type !== notGroupType) {
      groupId = doc.id;
      groupLength = data.users.length;
      break;
    }
  }
  return { groupId, groupLength };
};

export const addUserToGroup = async (gender: Gender, profession: string) => {
  const { groupId, groupLength } = await getGroupFreeSpot(gender);
  const userObject = {
    userId: auth.currentUser?.uid,
    gender,
    profession,
    position: groupLength + 1,
  };
  //add to group
  const groupRef = doc(db, "groups", groupId);
  await updateDoc(groupRef, { users: arrayUnion(userObject) });

  // update group length
  if (groupLength == 2) {
    await updateDoc(groupRef, { isFull: true });
  }
  //add info to user + statestore (with groupId)
  return { userObject, groupId };
};

export const getGroupParticipants = async (
  userGroup: string
): Promise<string[]> => {
  const userId = auth.currentUser?.uid;
  const groupsSnapshot = await getDoc(doc(db, "groups", userGroup));

  return groupsSnapshot.data()?.users.map((user: any) => {
    // if (user.userId === userId) return `${user.profession} (אני)`;
    return user.profession;
  });
};

//Only for INIT
export const initGroups = async () => {
  let typeCount = 0;
  const typeNames = ["girls", "mixed", "boys"];
  for (let i = 1; i <= 150; i++) {
    let groupRef = doc(db, "groups", i.toString());
    await setDoc(groupRef, {
      isFull: false,
      type: typeNames[typeCount],
      users: [],
    });
    typeCount = typeCount === 2 ? (typeCount = 0) : typeCount + 1;
  }
};
