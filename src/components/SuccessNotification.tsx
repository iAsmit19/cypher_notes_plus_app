"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/notification.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SuccessNotification() {
  const { successNotiMsg, useWindowDimensions } = useGlobal();
  const { width } = useWindowDimensions();

  return (
    <motion.div
      className={styles.notification_cont}
      initial={{ right: -500 }}
      animate={{ right: -2 }}
      transition={{ ease: "easeIn", duration: 0.3 }}
    >
      <div className={styles.notification_contents}>
        <Image
          className={styles.success_notification_icon}
          src="/success_notification_icon.svg"
          alt=""
          height={width > 576 ? 20 : 16}
          width={width > 576 ? 20 : 16}
          draggable="false"
        />
        <div className={styles.notification_info}>
          <h6>Success!</h6>
          <p>{successNotiMsg}</p>
        </div>
      </div>
    </motion.div>
  );
}
