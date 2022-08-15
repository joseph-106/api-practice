import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import fetcher from "../fetcher";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { IMessage, IUsers, METHOD } from "../types";

const MsgList = ({ smsgs, susers }: { smsgs: IMessage[]; susers: IUsers }) => {
  const { query } = useRouter();
  const userId = (query.userId || query.userid || "") as string;
  const [msgs, setMsgs] = useState<IMessage[]>(smsgs);
  const [editingId, setEditingId] = useState<string | null>(null);
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const getMessages = async () => {
    const newMsgs: IMessage[] = await fetcher(METHOD.GET, "/messages", {
      params: { cursor: msgs[msgs.length - 1]?.id || "" },
    });
    if (newMsgs.length === 0) {
      setHasNext(false);
      return;
    }
    setMsgs((msgs) => [...msgs, ...newMsgs]);
  };

  useEffect(() => {
    if (intersecting && hasNext) getMessages();
  }, [intersecting]);

  const onCreate = async (text: string) => {
    const newMsg: IMessage = await fetcher(METHOD.POST, "/messages", {
      text,
      userId,
    });
    if (!newMsg) throw Error("something wrong");
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdate = async (text: string, id?: string) => {
    const newMsg: IMessage = await fetcher(METHOD.PUT, `/messages/${id}`, {
      text,
      userId,
    });
    if (!newMsg) throw Error("something wrong");
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };

  const onDelete = async (id: string) => {
    const receivedId: string = await fetcher(METHOD.DELETE, `/messages/${id}`, {
      params: { userId },
    });
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex(
        (msg) => msg.id === receivedId.toString()
      );
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);

  return (
    <>
      {userId && <MsgInput mutate={onCreate} />}
      <ul className="messages">
        {msgs.map((msg) => (
          <MsgItem
            key={msg.id}
            {...msg}
            onUpdate={onUpdate}
            startEdit={() => setEditingId(msg.id)}
            isEditing={editingId === msg.id}
            onDelete={() => onDelete(msg.id)}
            myId={userId}
            user={susers[msg.userId]}
          />
        ))}
      </ul>
      <div ref={fetchMoreEl} />
    </>
  );
};

export default MsgList;
