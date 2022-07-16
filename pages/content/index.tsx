import Router from "next/router";
import { PageTypes } from "../../interfaces";

const ContentPage = ({ account }: PageTypes) => {
  if (account === false) {
    Router.push("/login");
  }
  return (
    <section>
      <h1 style={{ color: "white" }}>CECI EST VOTRE CONTENU</h1>
    </section>
  );
};

export default ContentPage;
