"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/stylings/header.module.css";
import AddPanel from "./AddPanel";
import { useGlobal } from "@/context/AppContext";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";

export default function Header() {
  // Extracting values from the Context
  const { addPanel, toggleAddPanel, profileMenu, setProfileMenu } = useGlobal();

  const handleprofileClick = () => {
    setProfileMenu((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.header_cont}>
        <div className={styles.header_logo}>
          <Image
            src="/cypher-logo.svg"
            alt=""
            height={24}
            width={100}
            draggable="false"
          />
        </div>
        <div className={styles.header_subject}>
          <div className={styles.header_add_button} onClick={toggleAddPanel}>
            <p>
              <Image
                src="/cypher-add.svg"
                alt=""
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
              onClick={handleprofileClick}
            />
          </div>
        </div>
      </div>

      {addPanel ? <AddPanel /> : null}
      {profileMenu ? <ProfileMenu /> : null}
    </header>
  );
}
