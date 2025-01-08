"use client";

import Header from "@/components/Header";
import styles from "@/stylings/trash.module.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobal } from "@/context/AppContext";
import TrashedNote from "@/components/TrashedNote";
import Image from "next/image";
import Link from "next/link";

export default function Trash() {
  const { setTrashNote, trashedNoteState, deleteNotePermanently } = useGlobal();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setTrashNote(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.trash_header}>
        <Link className={styles.back_navigation} href={"/"}>
          <Image
            className={styles.back_navigation_svg}
            src="/back-navigation.svg"
            alt=""
            height={17}
            width={17}
          />
        </Link>
        <div className={styles.trash_header_delete_all}>
          <button
            className={styles.trashed_note_delete_button}
            onClick={() => deleteNotePermanently()}
          >
            Delete All
          </button>
        </div>
      </div>
      <div className={styles.trash_page}>
        {!trashedNoteState.length ? (
          <div className={styles.trash_empty_cont}>
            <Image
              priority
              src="/trash_empty_graphic.webp"
              alt=""
              layout="intrinsic"
              height={200}
              width={200}
              draggable="false"
            />
            <p>No notes found in the Trash Fill...</p>
          </div>
        ) : (
          <div className={styles.trash_grid}>
            {trashedNoteState.map((trashedNote) => (
              <TrashedNote key={trashedNote._id} trashedNote={trashedNote} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.trash_notice}>
        <h2>NOTICE</h2>
        <p>
          The notes here will be &nbsp;
          <span className={styles.eye_catcher}>deleted in 30 days</span> and
          cannot be recovered. Please delete carefully.
        </p>
      </div>
    </div>
  );
}
