"use client";

import styles from "@/stylings/test.module.css";
import { useEffect, useState } from "react";

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

export default function TestPage() {
  const { width, height } = useWindowDimensions();

  return (
    <div className={styles.test_page}>
      <h1>Testing Page</h1>
      <p>This is a page to test the elements.</p>
      <p>window width: {width}px</p>
      <p>window height: {height}px</p>
      <p>Chilling</p>
    </div>
  );
}
