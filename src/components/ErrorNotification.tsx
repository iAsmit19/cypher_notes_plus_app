"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/notification.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ErrorNotification() {
  const { errorNotiMsg } = useGlobal();
  return (
    <motion.div
      className={styles.notification_cont}
      initial={{ right: -500 }}
      animate={{ right: -2 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
    >
      <div className={styles.notification_contents}>
        <Image
          className={styles.error_notification_icon}
          src="/error_notification_icon.svg"
          alt=""
          height={20}
          width={20}
          draggable="false"
        />
        <div className={styles.notification_info}>
          <h6>Error Occurred</h6>
          <p>{errorNotiMsg}</p>
        </div>
      </div>
    </motion.div>
  );
}
