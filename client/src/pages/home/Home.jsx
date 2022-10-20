import Posts from "../../components/Posts/Posts";
import PostShare from "../../components/PostShare/PostShare";
import TopBar from "../../components/TopBar/TopBar";
import "./home.css";

const Home = () => {
  return (
    <main className="home">
        <TopBar />
        <div className="container">
          <PostShare />
          <Posts />
        </div>
    </main>
  );
};

export default Home;
