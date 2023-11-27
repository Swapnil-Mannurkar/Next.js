import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src={"/images/site/swapnil.jpg"}
          alt="Swapnil Mannurkar"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Swapnil Mannurkar</h1>
      <p>
        I blog about web development - especially frontend framework like React.
      </p>
    </section>
  );
};

export default Hero;
