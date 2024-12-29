"use client";

import styles from "@/stylings/main.module.css";
import Note from "./Note";
import { useGlobal } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Main() {
  const { notes } = useGlobal();
  const gridRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const masonryRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Masonry only on the client
    async function initializeMasonry() {
      if (gridRef.current && notes.length) {
        const Masonry = (await import("masonry-layout")).default;

        if (!masonryRef.current) {
          // Initialize Masonry
          masonryRef.current = new Masonry(gridRef.current, {
            itemSelector: `.${styles.note_cont}`,
            columnWidth: 480,
            gutter: 40,
            fitWidth: true,
          });
        }

        // Reload Masonry items and layout
        masonryRef.current.reloadItems();
        masonryRef.current.layout();
      }
    }

    initializeMasonry();

    return () => {
      // Cleanup Masonry on unmount
      masonryRef.current?.destroy();
      masonryRef.current = null;
    };
  }, [notes]); // Re-run when notes change

  return (
    <main className={styles.main_cont}>
      {!notes.length ? (
        <div className={styles.loading_cont}>
          <Image
            src="/cypher-empty-graphic-dark.svg"
            alt="No Notes Available"
            height={200}
            width={200}
          />
        </div>
      ) : (
        <div className={styles.main_grid} ref={gridRef}>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
}
