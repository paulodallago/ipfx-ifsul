import React from "react";
import Hero from "../../components/Home/Hero/Hero.tsx";
import Contact from "../../components/common/Contact/Contact.tsx";
import Card from "../../components/Home/Card/Card.tsx";
import LastEvent from "../../components/Home/LastEvent/LastEvent.tsx";
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
