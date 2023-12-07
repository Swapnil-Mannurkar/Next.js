"use client";
import React from "react";
import Link from "next/link";
import styles from "./nav-link.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={
        pathName.startsWith(href)
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
