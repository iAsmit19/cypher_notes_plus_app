"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/main.module.css";

type NoteProps = {
  note: {
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

export default function Note({ note }: NoteProps) {
  const { moveToTrash, updateNote } = useGlobal();

  // Function to convert the numerical month into an alphabetical month
  function getMonth(monthNumber: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[parseInt(monthNumber)];
  }

  // Current date getter
  const currentDate = new Date();

  // Function to handle note editing
  const handleBlur = async (id: string, field: string, value: string) => {
    try {
      await updateNote(id, { [field]: value });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className={styles.note_cont}>
      <div className={styles.note_edit_mode}>
        <p>In editing mode</p>
      </div>
      <div className={styles.note_subject}>
        <div
          className={styles.note_title}
          contentEditable
          suppressContentEditableWarning
          aria-label="Edit note title"
          onBlur={(event) =>
            handleBlur(note._id, "title", event.target.textContent || "")
          }
        >
          <h1>{note.title}</h1>
        </div>
        <div className={styles.note_subject_div}></div>
        <div
          className={styles.note_content}
          contentEditable
          suppressContentEditableWarning
          onBlur={(event) =>
            handleBlur(note._id, "content", event.target.textContent || "")
          }
        >
          <div>{note.content}</div>
        </div>
      </div>
      <div className={styles.note_status_bar}>
        <button
          className={styles.note_delete_button}
          onClick={() => moveToTrash(note._id)}
        >
          Delete
        </button>
        <p>
          {note.day.toString() === currentDate.getDate().toString() &&
          note.month.toString() === currentDate.getMonth().toString() &&
          note.year.toString() === currentDate.getFullYear().toString()
            ? "Today"
            : `${getMonth(note.month)}, ${note.day}`}
          &nbsp;|&nbsp;
          {parseInt(note.hours) < 10 ? `0${note.hours}` : note.hours}:
          {parseInt(note.mins) < 10 ? `0${note.mins}` : note.mins}
        </p>
      </div>
    </div>
  );
}
