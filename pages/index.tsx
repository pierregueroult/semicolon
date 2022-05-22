import Posts from "../components/Posts";
import Videos from "../components/Videos";
import posts from "../utils/posts";

const IndexPage = ({ account }: { account: boolean }) => {
  return (
    <section className="home">
      <Videos
        id={2}
        title="Vidéos de motivation :"
      />
      <Posts
        id={1}
        title={"Posts Récents :"}
        posts={posts}
        account={account}
      />
      <Posts
        id={2}
        title={"Posts Populaires :"}
        posts={posts}
        account={account}
      />
    </section>
  );
};

export default IndexPage;
