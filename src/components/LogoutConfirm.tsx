import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/header.module.css";
import { motion } from "framer-motion";

export default function LogoutConfirm() {
  const { setToggleLogout, logout } = useGlobal();

  const handleOutClick = () => {
    setToggleLogout(false);
  };

  return (
    <motion.div
      className={styles.logout_confirm_cont}
      onClick={handleOutClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear", duration: 0.1 }}
    >
      <div
        className={styles.logout_confirm_panel}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Are you sure you want to logout?</h1>
        <div className={styles.logout_buttons}>
          <button className={styles.logout_logout_button} onClick={logout}>
            Logout
          </button>
          <button
            className={styles.logout_cancel_button}
            onClick={handleOutClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
