import styles from "@/styles/ReadAloud.module.css";
import { useState, useEffect } from "react";
import useStore from "@/utils/store";
import useSound from "use-sound";

type Props = {
  sndNumber: number;
};

export default function ReadAloud({ sndNumber }: Props) {
  const { currentSound, setCurrentSound } = useStore();
  const sndList = [
    "/sounds/intro.mp3",
    "/sounds/test_1.mp3",
    "/sounds/test_2.mp3",
    "/sounds/test_3.mp3",
    "/sounds/course_0.mp3",
    "/sounds/course_1_1.mp3",
    "/sounds/course_1_2.mp3",
    "/sounds/course_4_1.mp3",
    "/sounds/course_4_2.mp3",
  ];
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { stop, pause }] = useSound(sndList[sndNumber], {
    //interrupt: true,
    //soundEnabled: false,
    onplay: () => setIsPlaying(true),
    onmute: () => {
      setIsPlaying(false);
    },
    onend: () => {
      setIsPlaying(false);
      stop();
    },
  });

  useEffect(() => {
    if (currentSound !== sndNumber && isPlaying) {
      pause();
      setIsPlaying(false);
    }
    // Cleanup function
    return () => {
      if (isPlaying) {
        pause();
        setIsPlaying(false);
      }
    };
  }, [currentSound, sndNumber, pause, isPlaying]);

  const handleClick = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      setCurrentSound(-1); // Reset the currentSound if this sound was playing
    } else {
      play();
      setIsPlaying(true);
      setCurrentSound(sndNumber); // Set this sound as the currentSound
    }
  };

  return (
    <>
      {!isPlaying ? (
        <span className={styles.normalIcon} onClick={handleClick}>
          <i className="fa-solid fa-volume-high"></i>
        </span>
      ) : (
        <span className={styles.pauseIcon} onClick={handleClick}>
          <i className="fa-regular fa-circle-pause"></i>
        </span>
      )}
    </>
  );
}
