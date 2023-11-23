import Link from "next/link";
import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link} className={styles.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
