import { useEffect, useState } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const MsgList = () => {
  const [msgs, setMsgs] = useState([]);

  const UserIds = ["roy", "jay"];
  const getRandomUserId = () => UserIds[Math.round(Math.random())];

  useEffect(() => {
    setMsgs(
      Array(50)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          userId: getRandomUserId(),
          timestamp: 1234567890 + i * 1000 * 60,
          text: `${i + 1} mock text`,
        }))
        .reverse()
    );
  }, []);

  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((msg) => (
          <MsgItem key={msg.id} {...msg} />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
