import React from "react";

import styles from "./animated-check.module.css";

const AnimatedCheck = () => {
  return (
    <div className={styles.successCenter}>
      <div className={styles.successIcon}>
        <div className={styles.successIconTip} />
        <div className={styles.successIconLong} />
      </div>
    </div>
  );
};

export default AnimatedCheck;
