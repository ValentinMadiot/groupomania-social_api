import { IconChevronUp } from "@tabler/icons-react";
import { useEffect } from "react";
import PostShare from "../../components/PostShare/PostShare";
import Posts from "../../components/Posts/Posts";
import TopBar from "../../components/TopBar/TopBar";
import "./home.css";

const Home = () => {
  useEffect(() => {
    const scrollUp = () => {
      const scrollUpElement = document.getElementById("scroll-up");
      if (!scrollUpElement) return;

      if (window.scrollY >= 350) {
        scrollUpElement.classList.add("show-scroll");
      } else {
        scrollUpElement.classList.remove("show-scroll");
      }
    };

    window.addEventListener("scroll", scrollUp);

    return () => window.removeEventListener("scroll", scrollUp);
  }, []);

  return (
    <main className="home">
      <TopBar />
      <div className="container">
        <PostShare />
        <Posts />
        <a href="#" className="scrollup" id="scroll-up">
          <IconChevronUp stroke={2} />
        </a>
      </div>
    </main>
  );
};

export default Home;
