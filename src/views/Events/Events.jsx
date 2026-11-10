import React from "react";
import styles from "./Events.module.css";
import Timeline from "../../components/Events/Timeline/Timeline.tsx";

const Events = () => {
  return (
    <div className={styles.container}>
      <Timeline />
    </div>
  );
};

export default Events;
