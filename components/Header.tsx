import Link from "next/link";
import { HeaderTypes } from "../interfaces";

const Header = ({ account, accountDetails, setSearchValue }: HeaderTypes) => {
  const removeClass = () => {
    document
      .querySelector(".header__search")
      .classList.remove("input-is-focus");
  };

  const addClass = () => {
    document.querySelector(".header__search").classList.add("input-is-focus");
  };

  return (
    <header className="header">
      <Link href="/">
        <div className="header__title">
          <h2>Semicolon</h2>
        </div>
      </Link>
      <div className="header__search">
        <Link href="/search">
          <div className="header__search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              required
              id="search"
              autoComplete="off"
              onChange={e => setSearchValue(e.target.value)}
              onFocus={addClass}
              onBlur={removeClass}
            />
            <p>Contenus, comptes, ...</p>
          </div>
        </Link>
      </div>
      <div className="header__account">
        {account === true ? (
          <>
            <p>{accountDetails.username}</p>
            <Link href={`/account/`}>
              {accountDetails.pictureUrl !== null ? (
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
              ) : (
                <img src={accountDetails.pictureUrl} />
              )}
            </Link>
          </>
        ) : (
          <Link href="/login">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
          </Link>
        )}
        <div className="header__account__create">
          <h3>Créer un post</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
