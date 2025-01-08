"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/stylings/header.module.css";
import AddPanel from "./AddPanel";
import { useGlobal } from "@/context/AppContext";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuSS from "./MenuSS";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // handler to update dimensions
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // set initial dimensions
    handleResize();

    // add resize event listener
    window.addEventListener("resize", handleResize);

    // cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default function Header() {
  // Extracting values from the Context
  const {
    addPanel,
    toggleAddPanel,
    profileMenu,
    setProfileMenu,
    menuS,
    setMenuS,
  } = useGlobal();

  const handleProfileClick = () => {
    setProfileMenu((prev) => !prev);
  };

  const handleMenuSClick = () => {
    setMenuS((prev) => !prev);
  };

  const pathname = usePathname();
  const { width } = useWindowDimensions();
  return (
    <header className={styles.header}>
      <div className={styles.header_cont}>
        <div className={styles.header_logo}>
          <Image
            // src="/cypher-logo.svg"
            src={width > 576 ? "/logo_L.svg" : "/logo_Sm.svg"}
            alt="Cypher Notes"
            height={27}
            width={width > 576 ? 80 : 40}
            sizes="(max-width: 576px) 40px, 80px"
            draggable="false"
          />
        </div>
        <div className={styles.header_subject}>
          <div className={styles.header_add_button} onClick={toggleAddPanel}>
            <p>
              <Image
                src="/add_note.svg"
                alt="|"
                height={11}
                width={11}
                draggable="false"
              />
              Add Note
            </p>
          </div>
          <div className={styles.header_navbar}>
            <Link
              className={`${styles.header_nav_element} ${
                pathname === "/" ? styles.active_link : null
              }`}
              href={"/"}
            >
              <div className={styles.header_nav_element_text}>Notes</div>
            </Link>
            <Link
              className={`${styles.header_nav_element} ${
                pathname === "/archives" ? styles.active_link : null
              }`}
              href={"/archives"}
            >
              <div className={styles.header_nav_element_text}>Archives</div>
            </Link>
            <Link
              className={`${styles.header_nav_element} ${
                pathname === "/trash" ? styles.active_link : null
              }`}
              href={"/trash"}
            >
              <div className={styles.header_nav_element_text}>Trash</div>
            </Link>
          </div>
          {/* <div className={styles.header_div}></div> */}
          <div className={styles.header_settings}>
            <Image
              className={styles.header_settings_icon}
              src="/settings_icon.svg"
              alt=""
              height={26}
              width={26}
              draggable="false"
              onClick={handleProfileClick}
            />
          </div>
          <div className={styles.menu_sm_icon}>
            <Image
              src="menu_Sm.svg"
              alt="="
              height={24}
              width={24}
              draggable="false"
              onClick={handleMenuSClick}
            />
          </div>
        </div>
      </div>

      {addPanel ? <AddPanel /> : null}
      {profileMenu ? <ProfileMenu /> : null}
      {menuS ? <MenuSS /> : null}

      <div className={styles.add_button_sm} onClick={toggleAddPanel}>
        <Image src="/add_note_sm.svg" alt="+" height={20} width={20} />
      </div>
    </header>
  );
}
