import { useGlobal } from "@/context/AppContext";
import { useState } from "react";
import styles from "@/stylings/header.module.css";
import { motion } from "framer-motion";

export default function AddPanel() {
  const { addNote, toggleAddPanel } = useGlobal();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        setError("All fields are required");
        return;
      }

      if (title === "" || content === "") {
        setError("All fields are required");
        return;
      }

      await addNote(title, content);
      setTitle("");
      setContent("");
      setError(null);
    } catch {
      setError("Failed to add note, please try again.");
      console.error(error);
    }
  };

  return (
    <div className={styles.add_cont} onClick={toggleAddPanel}>
      <motion.div
        className={styles.add_panel}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 0.1 }}
      >
        <motion.div
          className={styles.add_panel_components}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.1, delay: 0.2 }}
        >
          <div className={styles.add_input_fields}>
            <input
              className={styles.add_title_input}
              required
              type="text"
              placeholder="Add Title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className={styles.add_inputs_div}></div>
            <textarea
              className={styles.add_content_input}
              required
              placeholder="Write your thoughts"
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className={styles.add_div}></div>
          <div className={styles.add_feature_bar}>
            <button
              className={styles.add_cancel_button}
              onClick={toggleAddPanel}
            >
              Cancel
            </button>
            <button className={styles.add_save_button} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
