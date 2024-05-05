import { useState } from "react";
import Header from "../Header/Header";
import Jobs from "../Jobs/Jobs";
import "./home.css";

const Home = () => {
  const [mount, setMount] = useState(false);
  return (
    <div className="main__container">
      <header className="title">
        <h1>Weekday - Your best job board</h1>
      </header>
      <Header setMount={setMount} />
      <Jobs mount={mount} />
    </div>
  );
};

export default Home;
