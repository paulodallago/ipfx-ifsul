import React from "react";
import Hero from "../../components/Home/Hero/Hero";
import Contact from "../../components/common/Contact/Contact";
import Card from "../../components/Home/Card/Card";
import LastEvent from "../../components/Home/LastEvent/LastEvent";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <LastEvent />
      <Card />
      <Contact />
    </div>
  );
};

export default Home;
