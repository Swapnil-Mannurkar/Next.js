import Link from "next/link";
import React from "react";
import logoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logo}>
        <Image src={logoImg} alt="logo" priority />
        <h3>NEXTLEVEL FOOD</h3>
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href={"/meals"}>Browse Meals</Link>
          </li>
          <li>
            <Link href={"/community"}>Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
