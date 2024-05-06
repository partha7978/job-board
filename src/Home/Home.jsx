import Header from "../Header/Header";
import Jobs from "../Jobs/Jobs";
import "./home.css";

const Home = () => {
  return (
    <div className="main__container">
      <header className="title">
        <h1>Weekday - Your best job board</h1>
      </header>
      <Header/>
      <Jobs/>
    </div>
  );
};

export default Home;
