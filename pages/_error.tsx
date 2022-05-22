import ErrorComponent from "../components/Error";
import { NextPage, NextPageContext } from "next";
import { ErrorTypes } from "../interfaces";

const Error: NextPage<ErrorTypes> = ({ statusCode }) => {
  return <ErrorComponent statusCode={statusCode}></ErrorComponent>;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
