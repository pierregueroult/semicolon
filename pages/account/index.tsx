import axios from "axios";
import url from "../../path.json";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { PageTypes } from "../../interfaces";
import { checkUuid } from "../../lib/check-uuid";

const AccountPage = ({ account, sessionUuid }: PageTypes) => {
  const [accountData, setAccountData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [message, setMessage] = useState("");

  const stopChange = () => {
    setEditing(false);
  };

  const startChange = () => {
    setEditing(true);
    let usernameField: HTMLInputElement = document.querySelector(
      'input[name="username"]'
    );
    console.log(usernameField);
  };

  useEffect(() => {
    if (account === false || !checkUuid(sessionUuid)) {
      Router.push("/login");
    } else {
      axios({
        method: "POST",
        url: url.serverPath + "/fetch/user",
        data: {
          token: sessionUuid,
        },
      }).then(res => {
        if (res.data.error !== true) {
          setAccountData(res.data.data);
        } else {
          setError(true);
          setMessage("Erreur lors du chargement des infos du compte");
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  return (
    <section className="account">
      <div
        className={
          popUp === true ? "account__popup show" : "account__popup hide"
        }
      >
        {message}
      </div>
      {account === false || !checkUuid(sessionUuid) ? (
        <h2>Vous n'êtes pas connecté !</h2>
      ) : accountData === null ? (
        error === false ? (
          <h2>Chargement des données du compte en cours</h2>
        ) : (
          <h2>Erreur lors du chargement du compte</h2>
        )
      ) : (
        <Fragment>
          <div
            className={
              editing === false
                ? "account__title own"
                : "account__title own change"
            }
          >
            <div className="account__title__container">
              {accountData.pictureUrl === null ? (
                <img
                  className="account__title-picture"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                />
              ) : (
                <img
                  className="account__title-picture"
                  src={accountData.pictureUrl}
                />
              )}
              <div className="account__title__titles">
                {editing === false ? (
                  <h2>{accountData.username}</h2>
                ) : (
                  <input
                    name="username"
                    type="text"
                  ></input>
                )}
                <h3 className="account__title-postnumber">
                  {accountData.Post.length} post
                  {accountData.Post.length > 1 ? "s" : ""} public
                  {accountData.Post.length > 1 ? "s" : ""}
                </h3>
              </div>
            </div>
            {editing === false ? (
              <button
                className="account__title__button"
                onClick={() => startChange()}
              >
                Modifier le profil
              </button>
            ) : (
              <button
                className="account__title__button sup"
                onClick={() => stopChange()}
              >
                Enregistrer les modifications
              </button>
            )}
          </div>
          <div className="account__mainbar">
            <div className="account__mainbar-mail">
              Mon Mail :{" "}
              {editing === false ? (
                <span>{accountData.email}</span>
              ) : (
                <input
                  name="email"
                  type="text"
                ></input>
              )}
            </div>
            <div className="account__mainbar-bio">
              Ma bio :
              {editing === false ? (
                accountData.bio === null ? (
                  " Aucune description"
                ) : (
                  <span>{" " + accountData.bio}</span>
                )
              ) : (
                <input
                  name="bio"
                  type="text"
                ></input>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default AccountPage;
