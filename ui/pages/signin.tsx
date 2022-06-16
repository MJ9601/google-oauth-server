import { NOTFOUND } from "dns";
import { get } from "lodash";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import fetcher from "../lib/fetcher";
import getGoogleOAuth2Url from "../lib/getGoogleUrl";

const Siginin = () => {
  return (
    <div className="wrap">
      <div className="card">
        <a href={getGoogleOAuth2Url()} className="buttonClass">
          Login with Google account
        </a>
      </div>
    </div>
  );
};

export default Siginin;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { res, req } = ctx;

  const {
    results: me,
    error,
    errorStatus,
  } = await fetcher(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/users/me`,
    req.headers
  );
  if (me && errorStatus !== 403) {
    res.setHeader("location", "/");
    res.statusCode = 301;
    res.end();
    return { props: {} };
  }
  return { props: {} };
};
