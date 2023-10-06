import { QuestionnaireData } from "@/components/Questionnaire";
import { KnowledgeTestData } from "@/components/Test";
import { create } from "zustand";

export type Gender = "F" | "M";

export interface AppState {
  isLoggedIn: boolean;
  currentChapter: number;
  currentLesson: number;
  gender: Gender;
  profession: string;
  group: string;
  position: number;

  questionnaire: QuestionnaireData;
  knowledgeTest: KnowledgeTestData;

  logIn: () => void;
  logOut: () => void;
  setCurrentChapter: (currentChapter: number) => void;
  setCurrentLesson: (currentLesson: number) => void;
  setGroup: (group: string) => void;
  setProfession: (profession: string) => void;
  setGender: (gender: Gender) => void;
  setPosition: (position: number) => void;
  setQuestionnaireData: (data: QuestionnaireData) => void;
  setKnowledgeTestData: (data: KnowledgeTestData) => void;
}

const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentChapter: 1,
  currentLesson: 0,
  gender: "F",
  profession: "",
  group: "",
  position: 0,

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

  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false }),
  setCurrentChapter: (currentChapter: number) => set({ currentChapter }),
  setCurrentLesson: (currentLesson: number) => set({ currentLesson }),
  setGroup: (group: string) => set({ group }),
  setProfession: (profession: string) => set({ profession }),
  setGender: (gender: Gender) => set({ gender }),
  setPosition: (position: number) => set({ position }),
  setQuestionnaireData: (questionnaire: QuestionnaireData) =>
    set({ questionnaire }),
  setKnowledgeTestData: (knowledgeTest: KnowledgeTestData) =>
    set({ knowledgeTest }),
}));

export default useStore;
