import { PageTypes } from "../../interfaces";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignIn from "../../components/login/SignIn";
import SignUp from "../../components/login/SignUp";

const LoginPage = ({
  account,
  setAccount,
  sessionUuid,
  setSessionUuid,
}: PageTypes): JSX.Element => {
  const [page, setPage]: ["signup" | "signin", Function] = useState("signup");
  const router = useRouter();
  useEffect(() => {
    if (account === true) {
      router.push("/");
    }
  }, []);

  return (
    <section
      className={`login ${page === "signup" ? "state-signup" : "state-signin"}`}
    >
      <SignIn
        account={account}
        setAccount={setAccount}
        sessionUuid={sessionUuid}
        setSessionUuid={setSessionUuid}
      />
      <div className={"login__container"}>
        <div className="login__container-signin login__container__part">
          <h2 className="login__container__title">Te revoilà !</h2>
          <p className="login__container__text">
            Pour continuer à partager sur Semicolon, entre tes informations pour
            te connecter.
          </p>
          <button
            className="login__container__button"
            onClick={() => setPage("signup")}
          >
            S'inscrire
          </button>
        </div>
        <div className="login__container-signup login__container__part">
          <h2 className="login__container__title">Bienvenue à toi !</h2>
          <p className="login__container__text">
            Pour nous rejoindre et partager sur Semicolon, entre tes
            informations pour t'inscrire.
          </p>
          <button
            className="login__container__button"
            onClick={() => setPage("signin")}
          >
            Se connecter
          </button>
        </div>
      </div>
      <SignUp
        account={account}
        setAccount={setAccount}
      />
    </section>
  );
};
export default LoginPage;
