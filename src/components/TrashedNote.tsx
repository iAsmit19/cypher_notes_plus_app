"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/main.module.css";

type NoteProps = {
  trashedNote: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    day: string;
    month: string;
    year: string;
    hours: string;
    mins: string;
    deletedAt: string | null;
  };
};

export default function TrashedNotes({ trashedNote }: NoteProps) {
  // Extracting values from the Context API
  const { restoreTrashNote, deleteFromTrash } = useGlobal();

  // Current date getter
  const currentDate = new Date();
  const calculateDaysLeftToDelete = (
    deletedAt?: string | null
    // currentDate: Date = new Date()
  ): string => {
    if (!deletedAt) return "No Data";

    // ensure deletedAt is a valid date object
    const deletedDate = new Date(deletedAt);
    if (isNaN(deletedDate.getTime())) {
      console.error("invalid deletedAt date:", deletedAt);
      return "";
    }

    // calculate time difference
    const diffTime =
      30 -
      Math.floor(
        (currentDate.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

    // ensure no negative values are returned
    if (diffTime <= 0) return " (0 days left)";

    return ` ${diffTime} days left`;
  };

  const handleDeleteClick = () => {
    deleteFromTrash(trashedNote._id);
  };

  return (
    <div className={styles.note_cont}>
      <div className={styles.note_subject}>
        <div className={styles.note_title}>
          <h1>{trashedNote.title}</h1>
        </div>
        <div className={styles.note_subject_div}></div>
        <div className={styles.note_content}>
          <p>{trashedNote.content}</p>
        </div>
      </div>
      <div className={styles.note_status_bar}>
        <div className={styles.trashed_note_buttons}>
          <button
            className={styles.note_restore_button}
            onClick={() => restoreTrashNote(trashedNote._id)}
          >
            Restore
          </button>
          <button
            className={styles.trashed_note_delete_button}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
        <p>{calculateDaysLeftToDelete(trashedNote.deletedAt)}</p>
      </div>
    </div>
  );
}
