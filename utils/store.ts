import { create } from "zustand";

type Gender = "F" | "M";

interface AppState {
  isLoggedIn: boolean;
  currentChapter: number;
  currentLesson: number;
  group: number;
  profession: string;
  gender: Gender;

  logIn: () => void;
  logOut: () => void;
  setCurrentChapter: (currentChapter: number) => void;
  setCurrentLesson: (currentLesson: number) => void;
  setGroup: (group: number) => void;
  setProfession: (profession: string) => void;
  setGender: (gender: Gender) => void;
}

const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentChapter: 1,
  currentLesson: 0,
  group: 0,
  profession: "",
  gender: "F",

  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false }),
  setCurrentChapter: (currentChapter: number) => set({ currentChapter }),
  setCurrentLesson: (currentLesson: number) => set({ currentLesson }),
  setGroup: (group: number) => set({ group }),
  setProfession: (profession: string) => set({ profession }),
  setGender: (gender: Gender) => set({ gender }),
}));

export default useStore;
