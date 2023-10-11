import chatStyles from "@/styles/Chat.module.css";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import useStore from "@/utils/store";
import { addMessage, getMessagesQuery } from "../utils/firebase";
import { onSnapshot } from "firebase/firestore";

type Gender = "F" | "M";

export default function GroupChat() {
  const scroll = useRef<HTMLSpanElement>(null);
  const stateStore = useStore();

  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([]);

  const icons = {
    F: [
      "fa-solid fa-otter fa-flip-horizontal",
      "fa-solid fa-kiwi-bird fa-flip-horizontal",
      "fa-solid fa-horse fa-flip-horizontal",
    ], //Otter, Kiwi, Horse
    M: [
      "fa-solid fa-bolt-lightning",
      "fa-solid fa-snowflake",
      "fa-solid fa-moon",
    ], //Lightning, Snowflake, Moon
  };

  const getIcon = (message: any) => {
    const msgGender: Gender = message.gender;
    return icons[msgGender][message.groupPosition];
  };

  useEffect(() => {
    const unsuscribe = onSnapshot(getMessagesQuery(stateStore), (snapshot) => {
      let messages: any[] = [];
      snapshot.forEach((doc) => messages.push(doc.data()));
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
              <span
                className={`${chatStyles.genderIcon} ${
                  msg.gender == "F"
                    ? chatStyles.girlColor
                    : chatStyles.boysColor
                }`}
              >
                <i className={getIcon(msg)}></i>
              </span>
              <span
                className={`${chatStyles.genderIcon} ${
                  msg.gender == "F"
                    ? chatStyles.girlColor
                    : chatStyles.boysColor
                }`}
              >{`${msg.displayName}: `}</span>
              {msg.text}
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
