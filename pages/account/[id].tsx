import axios from "axios";
import url from "../../path.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Posts from "../../components/Posts";
import { PageTypes } from "../../interfaces";

const ContentItemPage = ({ account }: PageTypes) => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(url.serverPath + "/fetch/uniqueUser", { params: { id: id } })
        .then(res => setData(res.data.data));
    }
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="account">
      {data !== undefined && data !== null ? (
        <>
          <div className="account__title">
            <Link href={`/account/${id}`}>
              {data.pictureUrl !== null ? (
                <img
                  className="account__title-picture"
                  src={data.pictureUrl}
                />
              ) : (
                <img
                  className="account__title-picture"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                />
              )}
            </Link>
            <div className="account__title__titles">
              <h2 className="account__title-username">{data.username}</h2>
              <h3 className="account__title-postnumber">
                {data.Post.length} post{data.Post.length > 1 ? "s" : ""} public
                {data.Post.length > 1 ? "s" : ""}
              </h3>
            </div>
          </div>
          <div className="account__content">
            <p className="account__content-bio">
              {data.bio !== null ? data.bio : "Cet utilisateur n'a pas de bio"}
            </p>
          </div>
          <div className="account__posts">
            {data.Post.length > 0 ? (
              <Posts
                id={1}
                title={`Posts publics de @${data.username}`}
                posts={data.Post}
                account={account}
              />
            ) : (
              <p>Cet utilisateur n'a jamais posté publiquement</p>
            )}
          </div>
        </>
      ) : data === null ? (
        "Compte inexistant"
      ) : (
        "Chargement en cours"
      )}
    </section>
  );
};

export default ContentItemPage;
