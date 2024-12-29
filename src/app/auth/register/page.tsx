"use client";

// import ErrorNotification from "@/components/ErrorNotification";
import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/register_page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  // Extracting values from the Context API
  const {
    register,
    // toggleErrorNoti,
    toggleErrorNotiSetter,
    setErrorNotiMsg,
  } = useGlobal();

  // States to manage the inputs for the registeration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Router to redirect
  const router = useRouter();

  // Function to handle the registeration submission button
  const handleRegisterClick = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorNotiMsg("All fields are required. please try again.");
      toggleErrorNotiSetter();
    } else {
      if (password !== confirmPassword) {
        setErrorNotiMsg("Passwords don't match. please try again.");
        toggleErrorNotiSetter();
      } else {
        try {
          await register(email, password);

          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        } catch {
          setErrorNotiMsg("Failed to register.");
          toggleErrorNotiSetter();
        }
      }
    }
  };

  return (
    <div className={styles.register_page}>
      {/* {toggleErrorNoti ? <ErrorNotification /> : null} */}
      <div className={styles.register_cont}>
        <div className={styles.register_content}>
          <div className={styles.register_title}>
            <h1>Register to Cypher Notes</h1>
          </div>
          <div className={styles.register_inputs}>
            <div className={styles.register_email_input}>
              <input
                required
                type="text"
                placeholder="email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.register_password_input}>
              <input
                type="password"
                placeholder="your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className={styles.register_confirm_password_input}>
              <input
                type="password"
                placeholder="confirm your password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <div className={styles.register_enter_button}>
              <button onClick={handleRegisterClick}>Register</button>
            </div>
          </div>
          <div className={styles.register_divider}></div>
          <div className={styles.register_buttons}>
            <div className={styles.register_login_button}>
              <p>Already a user?</p>
              <Link className={styles.button_link} href={"/auth/login"}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
