import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1>Sobre o projeto</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since 1966, when designers at Letraset and James Mosley, the librarian
        at St Bride Printing Library in London, took a 1914 Cicero translation
        and scrambled it to make dummy text for Letraset's Body Type sheets. It
        has survived not only many decades, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised thanks
        to these sheets and more recently with desktop publishing software like
        Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
      </p>
    </div>
  );
};

export default About;
