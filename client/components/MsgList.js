import { useEffect, useState } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const MsgList = () => {
  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  const onUpdate = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };

  const onDelete = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((msg) => (
          <MsgItem
            key={msg.id}
            {...msg}
            onUpdate={onUpdate}
            startEdit={() => setEditingId(msg.id)}
            isEditing={editingId === msg.id}
            onDelete={() => onDelete(msg.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
