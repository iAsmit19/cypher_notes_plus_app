"use client";

import { useGlobal } from "@/context/AppContext";
import styles from "@/stylings/login_page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
// import ErrorNotification from "@/components/ErrorNotification";
// import SuccessNotification from "@/components/SuccessNotification";

export default function LoginPage() {
  // Extracting values from the context
  const {
    login,
    toggleErrorNotiSetter,
    setErrorNotiMsg,
    toggleSuccessNotiSetter,
    setSuccessNotiMsg,
    setNote,
  } = useGlobal();

  // State to manage the inputs for the login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Router to redirect
  const router = useRouter();

  // Function to handle the login submission button
  const handleLoginClick = async () => {
    if (email === "" || password === "") {
      setErrorNotiMsg("Email and Password are required!");
      toggleErrorNotiSetter();
      // console.log("Email and Password are required!");
      return;
    }

    try {
      // Call login and get the token
      const { token } = await login(email, password);
      // console.log("Login successful, token:", token);

      // Store the token in cookies
      Cookies.set("token", token, { sameSite: "lax", expires: 1 });

      setSuccessNotiMsg("Login successful. Redirecting.");
      toggleSuccessNotiSetter();

      setNote(token);

      // Redirect to the homepage after a short delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch {
      setErrorNotiMsg("Failed to login the User.");
      toggleErrorNotiSetter();
      console.log("Failed to login user.");
    }
  };

  return (
    <div className={styles.login_page}>
      {/* {toggleErrorNoti ? <ErrorNotification /> : null} */}
      {/* {toggleSuccessNoti ? <SuccessNotification /> : null} */}
      <div className={styles.login_cont}>
        <form
          className={styles.login_content}
          onSubmit={(event) => event.preventDefault()}
        >
          <div className={styles.login_title}>
            <h1>Log in</h1>
          </div>
          <div className={styles.login_inputs}>
            <div className={styles.login_email_input}>
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.login_password_input}>
              <input
                type="password"
                placeholder="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className={styles.login_enter_button}>
              <button type="button" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          </div>
          <div className={styles.login_divider}></div>
          <div className={styles.login_buttons}>
            <div className={styles.login_register_button}>
              <p>New to Cypher Notes?</p>
              <Link className={styles.button_link} href={"/auth/register"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
