import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PostTypes } from "../interfaces";

const Post = ({ id, title, content, likes, shares, account }: PostTypes) => {
  const router = useRouter();

  useEffect(() => {
    const ellipsize = () => {
      let el: Element = document.querySelector(`#text-${id}`);
      let array = el.innerHTML.split(" ");
      while (el.scrollHeight > el.clientHeight) {
        array.pop();
        el.innerHTML = array.join(" ") + "...";
      }
    };
    ellipsize();
  }, []);

  const likeButton = () => {
    if (account !== true) {
      router.push("/login");
      return;
    } else {
    }
  };

  const shareButton = () => {};

  return (
    <div className="post">
      <Link href={`/post/${id}`}>
        <div className="post__container">
          <h3 className="post__title">{title}</h3>
          <p
            className="post__content custom-vertical-scrollbar"
            id={`text-${id}`}
          >
            {content}
          </p>
        </div>
      </Link>
      <div className="post__activity">
        <div onClick={likeButton}>
          <i className="fa-solid fa-heart"></i>
          <p>{likes}</p>
        </div>
        <div onClick={shareButton}>
          <i className="fa-solid fa-share-nodes"></i>
          <p>{shares}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
