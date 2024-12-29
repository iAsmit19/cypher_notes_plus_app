"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/notification.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TaskNotification() {
  const { taskNotiMsg } = useGlobal();
  return (
    <div className={styles.task_noti_marginer}>
      <motion.div
        className={styles.task_notification_cont}
        initial={{ bottom: -500 }}
        animate={{ bottom: 70 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
      >
        <div className={styles.task_notification_contents}>
          <Image
            className={styles.task_notification_icon}
            src="/task_notification_icon.svg"
            alt=""
            height={16}
            width={16}
            draggable="false"
          />
          <div className={styles.task_notification_info}>
            <h6>Notification</h6>
            <p>{taskNotiMsg}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
