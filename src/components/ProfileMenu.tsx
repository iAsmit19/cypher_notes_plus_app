"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/header.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfileMenu() {
  const { setProfileMenu, logout } = useGlobal();

  const handleProfileOutClick = () => {
    setProfileMenu((prev) => !prev);
  };

  return (
    <div className={styles.profile_menu_cont} onClick={handleProfileOutClick}>
      <motion.div
        className={styles.profile_menu}
        onClick={(event) => event.stopPropagation()}
        initial={{ height: "50px", opacity: 0 }}
        animate={{ height: "150px", opacity: 1 }}
        exit={{ height: "50px", opacity: 0 }}
        transition={{ ease: "linear", duration: 0.1 }}
      >
        <motion.div
          className={styles.profile_menu_contents}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.profile_options}>
            <div
              className={styles.profile_profile_option}
              onClick={handleProfileOutClick}
            >
              <Link className={styles.profile_links} href="/profile">
                Profile
              </Link>
            </div>
            <div className={styles.options_div}></div>
            <div
              className={styles.profile_contact_option}
              onClick={handleProfileOutClick}
            >
              <Link className={styles.profile_links} href="/contact-dev">
                Contact Dev
              </Link>
            </div>
          </div>
          <div className={styles.profile_menu_div}></div>
          <div className={styles.profile_logout_option}>
            <Link
              className={styles.profile_links}
              href=""
              onClick={() => {
                logout();
                handleProfileOutClick();
              }}
            >
              Logout{" "}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
