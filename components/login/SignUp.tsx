export default function SignUp({
  account,
  setAccount,
}: {
  account: boolean;
  setAccount: Function;
}) {
  return (
    <div className="login__section">
      <h2 className="login__section__title">Créer un compte</h2>
      <div className="login__section__form">
        <div className="login__section__container">
          <input
            type="text"
            name="sign-up-username"
            id="sign-up-username"
            required
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
          />
          <label htmlFor="sign-up-password">
            <p>
              <i className="fa-solid fa-key" />
            </p>
            <p>Mot de passe</p>
          </label>
        </div>
      </div>
      <button>S'Inscrire</button>
    </div>
  );
}
