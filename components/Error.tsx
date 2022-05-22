import { ErrorTypes } from "../interfaces";

const ErrorComponent = ({ statusCode }: ErrorTypes) => {
  return (
    <section className="error">
      <h2 className="error__number">{statusCode}</h2>
      <div className="error__container">
        <p className="error__text">
          {statusCode === 404
            ? "Cette page n'existe pas"
            : statusCode === 500
            ? "Erreur de connection au serveur"
            : "Erreur"}
        </p>
      </div>
    </section>
  );
};

export default ErrorComponent;
