import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/header.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuSS() {
  // Extracting values from the Context
  const { setMenuS, setToggleLogout } = useGlobal();

  const handleMenuSClick = () => {
    setMenuS((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <div className={styles.menu_sm_cont} onClick={handleMenuSClick}>
      <motion.div
        className={styles.menu_sm}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          ease: "easeOut",
          duration: 0.1,
          delay: 0.1,
        }}
      >
        <div className={styles.menu_bar}>
          <p>Menu</p>
          <Image
            className={styles.menu_close_icon}
            src="/menu_Sm_X.svg"
            alt="X"
            height={24}
            width={24}
            onClick={handleMenuSClick}
          />
        </div>
        <div className={styles.menu_options}>
          <div className={styles.menu_nav}>
            <Link
              className={`${styles.menu_nav_els} ${styles.menu_opt_profile} ${
                pathname === "/profile" ? styles.active_menu : null
              }`}
              href={"/profile"}
              onClick={handleMenuSClick}
            >
              Profile
            </Link>
            <Link
              className={`${styles.menu_nav_els} ${styles.menu_opt_notes} ${
                pathname === "/" ? styles.active_menu : null
              }`}
              href={"/"}
              onClick={handleMenuSClick}
            >
              Notes
            </Link>
            <Link
              className={`${styles.menu_nav_els} ${styles.menu_opt_trash} ${
                pathname === "/trash" ? styles.active_menu : null
              }`}
              href={"/trash"}
              onClick={handleMenuSClick}
            >
              Trash
            </Link>
            <Link
              className={`${styles.menu_nav_els} ${styles.menu_opt_archives} ${
                pathname === "/archives" ? styles.active_menu : null
              }`}
              href={"/archives"}
              onClick={handleMenuSClick}
            >
              Archives
            </Link>
          </div>
          <div className={styles.menu_logout}>
            <Link
              className={styles.menu_logout_button}
              href=""
              onClick={() => {
                setToggleLogout(true);
                handleMenuSClick();
              }}
            >
              Logout{" "}
              <Image
                src="log-out_icon_Sm.svg"
                alt=">"
                height={13}
                width={13}
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
