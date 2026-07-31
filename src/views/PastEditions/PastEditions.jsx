import React from "react";
import styles from "./PastEditions.module.css";
import Timeline from "../../components/past-editions/Timeline/Timeline";

const PastEditions = () => {
  return (
    <div className={styles.container}>
      <Timeline />
    </div>
  );
};

export default PastEditions;
