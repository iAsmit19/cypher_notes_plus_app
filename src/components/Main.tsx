"use client";

import styles from "@/stylings/main.module.css";
import Note from "./Note";
import { useGlobal } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Main() {
  const { notes, useWindowDimensions } = useGlobal();

  const { width } = useWindowDimensions();

  const gridRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const masonryRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Masonry only on the client
    async function initializeMasonry() {
      if (gridRef.current && notes.length) {
        const Masonry = (await import("masonry-layout")).default;

        if (!masonryRef.current) {
          const calculateColumnWidth = () => {
            if (width <= 576) {
              return 300;
            } else if (width <= 768) {
              return 440;
            } else {
              return 480;
            }
          };

          // Initialize Masonry
          masonryRef.current = new Masonry(gridRef.current, {
            itemSelector: `.${styles.note_cont}`,
            // columnWidth: 480,
            columnWidth: calculateColumnWidth(),
            gutter: 40,
            fitWidth: true,
            percentPosition: true,
            // stagger: 30,
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
  }, [notes, width]); // Re-run when notes change

  return (
    <main className={styles.main_cont}>
      {!notes.length ? (
        <div className={styles.loading_cont}>
          <Image
            priority
            src="/main_empty_graphic.webp"
            alt="No Notes Available"
            height={200}
            width={200}
            draggable="false"
          />
          <p>Fill this area with your thoughts!</p>
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
