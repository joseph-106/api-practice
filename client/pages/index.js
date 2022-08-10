import MsgList from "../components/MsgList";
import fetcher from "../fetcher";

const Home = ({ smsgs, susers }) => {
  return (
    <>
      <h1>React API Practice</h1>
      <MsgList smsgs={smsgs} susers={susers} />
    </>
  );
};

export const getServerSideProps = async () => {
  const smsgs = await fetcher("get", "/messages");
  const susers = await fetcher("get", "/users");
  return {
    props: { smsgs, susers },
  };
};

export default Home;
