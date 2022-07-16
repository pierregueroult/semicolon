import axios from "axios";
import url from "../../path.json";
import { useState } from "react";
import Router from "next/router";
import * as EmailValidator from "email-validator";

export default function SignUp({
  account,
  setAccount,
  sessionUuid,
  setSessionUuid,
  page,
  setPage,
}: {
  account: boolean;
  setAccount: Function;
  sessionUuid: string;
  setSessionUuid: Function;
  page: string;
  setPage: Function;
}) {
  const [error, setError] = useState("");
  const pickData = () => {
    const usernameElement: HTMLInputElement =
      document.querySelector("#sign-up-username");
    const emailElement: HTMLInputElement =
      document.querySelector("#sign-up-mail");
    const passwordElement: HTMLInputElement =
      document.querySelector("#sign-up-password");
    if (usernameElement.value.length <= 5) {
      setError("Nom d'utilisateur trop court");
      return;
    }
    if (passwordElement.value.length <= 7) {
      setError("Mot de passe trop court");
      return;
    }
    if (EmailValidator.validate(emailElement.value) !== true) {
      setError("Email non valide");
      return;
    }
    axios({
      method: "POST",
      url: url.serverPath + "/create/user",
      data: {
        username: usernameElement.value,
        email: emailElement.value,
        password: passwordElement.value,
      },
    }).then(res => {
      console.log(res);

      if (res.data.error === true) {
        switch (res.data.errorCode) {
          case null:
            setError("Erreur lors de la création du compte.");
            break;
          case 5:
            setError("Email déjà utilisé");
            break;
          case 6:
            setError("Nom d'utilisateur déjà utilisé");
            break;
          case 7:
            setError("Veuillez remplir tout les champs");
            break;
        }
      } else {
        setError("");
        setPage("signin");
        usernameElement.value = "";
        emailElement.value = "";
        passwordElement.value = "";
      }
    });
  };

  return (
    <div className="login__section">
      <h2 className="login__section__title">Créer un compte</h2>
      <form className="login__section__form">
        <div className="login__section__container">
          <input
            type="text"
            name="sign-up-username"
            id="sign-up-username"
            required
            autoComplete="username"
          />
          <label htmlFor="sign-up-username">
            <p>
              <i className="fa-solid fa-user" />
            </p>
            <p>Nom d'utilisateur</p>
          </label>
        </div>
        <div className="login__section__container">
          <input
            type="mail"
            name="sign-up-mail"
            id="sign-up-mail"
            required
            autoComplete="email"
          />
          <label htmlFor="sign-up-mail">
            <p>
              <i className="fa-solid fa-at" />
            </p>
            <p>Adresse Email</p>
          </label>
        </div>
        <div className="login__section__container">
          <input
            type="password"
            name="sign-up-password"
            id="sign-up-password"
            required
            autoComplete="current-password"
          />
          <label htmlFor="sign-up-password">
            <p>
              <i className="fa-solid fa-key" />
            </p>
            <p>Mot de passe</p>
          </label>
        </div>
      </form>
      <button onClick={pickData}>S'Inscrire</button>
      <p className="login__section__error">{error}</p>
    </div>
  );
}
