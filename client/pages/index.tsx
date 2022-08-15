import MsgList from "../components/MsgList";
import fetcher from "../fetcher";
import { IMessage, IUsers, METHOD } from "../types";

const Home = ({ smsgs, susers }: { smsgs: IMessage[]; susers: IUsers }) => {
  return (
    <>
      <h1>React API Practice</h1>
      <MsgList smsgs={smsgs} susers={susers} />
    </>
  );
};

export const getServerSideProps = async () => {
  const smsgs = await fetcher(METHOD.GET, "/messages");
  const susers = await fetcher(METHOD.GET, "/users");
  return {
    props: { smsgs, susers },
  };
};

export default Home;
