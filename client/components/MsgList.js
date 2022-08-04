import { useEffect, useState } from "react";
import MsgItem from "./MsgItem";

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

  return (
    <ul className="messages">
      {msgs.map((msg) => (
        <MsgItem key={msg.id} {...msg} />
      ))}
    </ul>
  );
};

export default MsgList;
