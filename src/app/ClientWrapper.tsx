"use client";

import ErrorNotification from "@/components/ErrorNotification";
import LogoutConfirm from "@/components/LogoutConfirm";
import SuccessNotification from "@/components/SuccessNotification";
import TaskNotification from "@/components/TaskNotification";
import { useGlobal } from "@/context/AppContext";
import "@/globals.css";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const { toggleErrorNoti, toggleSuccessNoti, toggleTaskNoti, toggleLogout } =
    useGlobal();

  return (
    <>
      {toggleLogout ? <LogoutConfirm /> : null}
      {toggleErrorNoti ? <ErrorNotification /> : null}
      {toggleSuccessNoti ? <SuccessNotification /> : null}
      {toggleTaskNoti ? <TaskNotification /> : null}

      {/* <div className="s_sc_block">
        <div className="s_sc_window">
          <h2>Apologies</h2>
          <p>
            This site is not ready for smaller screens. <br /> Please wait till
            the next update.
          </p>
        </div>
      </div> */}
      {children}
    </>
  );
};

export default ClientWrapper;
