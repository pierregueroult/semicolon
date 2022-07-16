import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import url from "../../path.json";

export default function SignIn({
  account,
  setAccount,
  sessionUuid,
  setSessionUuid,
}: {
  account: boolean;
  setAccount: Function;
  sessionUuid: string;
  setSessionUuid: Function;
}) {
  const [error, setError] = useState("");
  const pickData = () => {
    const emailElement: HTMLInputElement =
      document.querySelector("#sign-in-mail");
    const passwordElement: HTMLInputElement =
      document.querySelector("#sign-in-password");
    axios({
      method: "POST",
      url: url.serverPath + "/check/password",
      data: {
        email: emailElement.value,
        password: passwordElement.value,
      },
    }).then(res => {
      if (res.data.error === true) {
        if (res.data.errorCode === 3) {
          setError("Compte inexistant !");
        } else if (res.data.errorCode === 4) {
          setError("Mot de passe incorrect !");
        } else {
          setError("Une erreur est intervenue ...");
        }
      } else if (res.data.error === false) {
        setAccount(true);
        setSessionUuid(res.data.data.token);
        Router.push("/");
      }
    });
  };

  return (
    <div className="login__section">
      <h2 className="login__section__title">Se Connecter</h2>
      <form className="login__section__form">
        <div className="login__section__container">
          <input
            type="text"
            name="sign-in-mail"
            id="sign-in-mail"
            required
            autoComplete="email"
          />
          <label htmlFor="sign-in-mail">
            <p>
              <i className="fa-solid fa-at" />
            </p>
            <p>Adresse Email</p>
          </label>
        </div>
        <div className="login__section__container">
          <input
            type="password"
            name="sign-in-password"
            id="sign-in-password"
            required
            autoComplete="current-password"
          />
          <label htmlFor="sign-in-password">
            <p>
              <i className="fa-solid fa-key" />
            </p>
            <p>Mot de passe</p>
          </label>
        </div>
      </form>
      <button onClick={pickData}>Se connecter</button>
      <p className="login__section__error">{error}</p>
    </div>
  );
}
