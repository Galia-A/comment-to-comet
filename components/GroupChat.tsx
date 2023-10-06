import courseStyles from "@/styles/Course.module.css";
import chatStyles from "@/styles/Chat.module.css";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import useStore from "@/utils/store";
import { addMessage, getMessagesQuery } from "../utils/firebase";
import { onSnapshot } from "firebase/firestore";

export default function GroupChat() {
  const scroll = useRef<HTMLSpanElement>(null);
  const stateStore = useStore();
  const gender = stateStore.gender;
  const currentChapter = stateStore.currentChapter;
  const currentLesson = stateStore.currentLesson;
  const profession = stateStore.profession;
  const group = stateStore.group;

  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<string[]>([]);

  useEffect(() => {
    const unsuscribe = onSnapshot(getMessagesQuery(stateStore), (snapshot) => {
      let messages: string[] = [];
      snapshot.forEach((doc) => messages.push(doc.data().text));
      setAllMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.length === 0) return;
    await addMessage(newMessage, stateStore);
    setNewMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={chatStyles.chatArea}>
      <form onSubmit={handleSubmit}>
        <div className={chatStyles.title}>צ'אט</div>
        <div className={chatStyles.allMsgArea}>
          {allMessages.map((msg) => (
            <div className={chatStyles.singleMsgArea}>
              <span>{`${stateStore.profession} :`}</span>
              {msg}
            </div>
          ))}
        </div>
        <div className={chatStyles.newMsg}>
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={stateStore.gender === "F" ? "הקלידי כאן" : "הקלד כאן"}
            value={newMessage}
            className={chatStyles.input}
          />
          <span ref={scroll}></span>
          <Button type="submit" className={chatStyles.addMsgButton}>
            שליחה
          </Button>
        </div>
      </form>
    </div>
  );
}
