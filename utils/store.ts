import { QuestionnaireData } from "@/components/Questionnaire";
import { KnowledgeTestData } from "@/components/Test";
import { QuestionnaireDataB } from "@/components/FlyingQuestionnaire";
import { KnowledgeTestDataB } from "@/components/FlyingTest";
import { create } from "zustand";

export type Gender = "F" | "M";
type GroupFinalAnswer = { answers: number[]; variables: string[] }[];

export interface AppState {
  uid?: string;
  isLoggedIn: boolean;
  currentChapter: number;
  currentLesson: number;
  gender: Gender;
  profession: string;
  group: string;
  position: number;
  singleProgrammingAnswers: number[][];
  groupProgramingAnswers: GroupFinalAnswer;

  questionnaire: QuestionnaireData;
  knowledgeTest: KnowledgeTestData;
  questionnaireB: QuestionnaireDataB;
  knowledgeTestB: KnowledgeTestDataB;

  logIn: (uid: string) => void;
  logOut: () => void;
  setCurrentChapter: (currentChapter: number) => void;
  setCurrentLesson: (currentLesson: number) => void;
  setGroup: (group: string) => void;
  setProfession: (profession: string) => void;
  setGender: (gender: Gender) => void;
  setPosition: (position: number) => void;
  setSingleProgrammingAnswers: (answers: number[][]) => void;
  setGroupProgrammingAnswers: (answers: GroupFinalAnswer) => void;
  setQuestionnaireData: (data: QuestionnaireData) => void;
  setKnowledgeTestData: (data: KnowledgeTestData) => void;
  setQuestionnaireDataB: (data: QuestionnaireDataB) => void;
  setKnowledgeTestDataB: (data: KnowledgeTestDataB) => void;
  deleteEverything: () => void;
}

const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentChapter: 1,
  currentLesson: 0,
  gender: "F",
  profession: "",
  group: "",
  position: 0,
  singleProgrammingAnswers: [],
  groupProgramingAnswers: [],

  questionnaire: {
    age: "",
    gender: "F",
    majorChoice: [],
    majorChoiceOther: "",
    knowledgeInProgramming: "",
    knowledgeInSpaceConcepts: "",
    howDidYouGetHere: "",
    attitudeA: {},
  },
  knowledgeTest: {
    space1: "",
    space2: "",
    space3: "",
    space4: "",
    space5: "",
    space6: "",
    programming7: "",
    programming8: "",
    computational9: "",
    computational10: "",
    computational11: "",
    computational12: "",
  },
  questionnaireB: {
    knowledgeInProgrammingB: "",
    knowledgeInSpaceConceptsB: "",
    attitudeB: {},
    commentsB: "",
  },
  knowledgeTestB: {
    space1B: "",
    space2B: "",
    space3B: "",
    space4B: "",
    space5B: "",
    space6B: "",
    programming7B: "",
    programming8B: "",
    computational9B: "",
    computational10B: "",
    computational11B: "",
    computational12B: "",
  },

  logIn: (uid: string) => set({ isLoggedIn: true, uid }),
  logOut: () => set({ isLoggedIn: false, uid: undefined }),
  setCurrentChapter: (currentChapter: number) => set({ currentChapter }),
  setCurrentLesson: (currentLesson: number) => set({ currentLesson }),
  setGroup: (group: string) => set({ group }),
  setProfession: (profession: string) => set({ profession }),
  setGender: (gender: Gender) => set({ gender }),
  setPosition: (position: number) => set({ position }),
  setSingleProgrammingAnswers: (answers: number[][]) =>
    set({ singleProgrammingAnswers: answers }),
  setGroupProgrammingAnswers: (answers: GroupFinalAnswer) =>
    set({ groupProgramingAnswers: answers }),
  setQuestionnaireData: (questionnaire: QuestionnaireData) =>
    set({ questionnaire }),
  setKnowledgeTestData: (knowledgeTest: KnowledgeTestData) =>
    set({ knowledgeTest }),
  setQuestionnaireDataB: (questionnaireB: QuestionnaireDataB) =>
    set({ questionnaireB }),
  setKnowledgeTestDataB: (knowledgeTestB: KnowledgeTestDataB) =>
    set({ knowledgeTestB }),
  deleteEverything: () =>
    set({
      isLoggedIn: false,
      currentChapter: 1,
      currentLesson: 0,
      gender: "F",
      profession: "",
      group: "",
      position: 0,
      singleProgrammingAnswers: [],
      groupProgramingAnswers: [],

      questionnaire: {
        age: "",
        gender: "F",
        majorChoice: [],
        majorChoiceOther: "",
        knowledgeInProgramming: "",
        knowledgeInSpaceConcepts: "",
        howDidYouGetHere: "",
        attitudeA: {},
      },
      knowledgeTest: {
        space1: "",
        space2: "",
        space3: "",
        space4: "",
        space5: "",
        space6: "",
        programming7: "",
        programming8: "",
        computational9: "",
        computational10: "",
        computational11: "",
        computational12: "",
      },
      questionnaireB: {
        knowledgeInProgrammingB: "",
        knowledgeInSpaceConceptsB: "",
        attitudeB: {},
        commentsB: "",
      },
      knowledgeTestB: {
        space1B: "",
        space2B: "",
        space3B: "",
        space4B: "",
        space5B: "",
        space6B: "",
        programming7B: "",
        programming8B: "",
        computational9B: "",
        computational10B: "",
        computational11B: "",
        computational12B: "",
      },
    }),
}));

export default useStore;
