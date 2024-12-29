"use client";

import { useEffect } from "react";
import { useGlobal } from "@/context/AppContext";
import Cookies from "js-cookie";
import styles from "@/stylings/root.module.css";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function CypherUI() {
  const { setNote } = useGlobal();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setNote(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.root_cont}>
      <Header />
      <Main />
    </div>
  );
}
