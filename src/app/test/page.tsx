"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/test.module.css";

export default function TestPage() {
  const { useWindowDimensions } = useGlobal();

  const { width, height } = useWindowDimensions();

  return (
    <div className={styles.test_page}>
      <h1>Testing Page</h1>
      <p>This is a page to test the elements.</p>
      <p>window width: {width}px</p>
      <p>window height: {height}px</p>
      <p>Bing Chilling</p>
    </div>
  );
}
