import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import fetcher from "../lib/fetcher";

const Home = ({ me }: { me: any }) => {
  return (
    <div className="wrap">
      <div className="card">
        <h2 className="title">WelCome!</h2>
        <h5 className="text">{me.email}</h5>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, res } = ctx;
  const {
    results: me,
    error,
    errorStatus,
  } = await fetcher(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/users/me`,
    req.headers
  );

  if (errorStatus === 403) {
    res.setHeader("location", "/signin");
    res.statusCode = 301;
    res.end();

    return { props: {} };
  }

  return {
    props: {
      me,
    },
  };
};
