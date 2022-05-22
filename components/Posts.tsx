import Post from "./Post";
import { PostsTypes } from "../interfaces";

const Posts = ({
  id,
  title,
  posts,
  account,
}: {
  id: number;
  title: string;
  posts: PostsTypes;
  account: boolean;
}) => {
  const changeScroll = (amount: number) => {
    let element = document.querySelector(`#homeSection-${id}`);
    if (element != null) {
      element.scrollTo({ left: element.scrollLeft + amount });
    } else {
      console.log(`document.querySelector('#homeSection-${id}')`);
    }
  };

  return (
    <div className="home__section">
      <h2>{title}</h2>
      <div className="home__section__container">
        <div
          className="home__section__navigation"
          onClick={() => changeScroll(-320)}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div
          className="home__section__content custom-horizontal-scrollbar"
          id={`homeSection-${id}`}
        >
          {posts.map(({ id, title, content, likes, shares }, i) => (
            <Post
              id={id}
              title={title}
              content={content}
              likes={likes}
              shares={shares}
              account={account}
              key={i + 1}
            />
          ))}
        </div>
        <div
          className="home__section__navigation"
          onClick={() => changeScroll(320)}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Posts;
