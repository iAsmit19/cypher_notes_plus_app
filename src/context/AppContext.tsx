"use client";

import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Note's Skeleton / Type
type Note = {
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

// Context API Skeleton / Type
type GlobalContextType = {
  // State to manage the Add New Note Panel
  addPanel: boolean;
  setAddPanel: React.Dispatch<React.SetStateAction<boolean>>;
  // Function to toggle the Add New Note Panel
  toggleAddPanel: () => void;

  // State to manage the Profile Menu Panel
  profileMenu: boolean;
  setProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;

  // State to manage the Error Notification Message
  errorNotiMsg: string;
  setErrorNotiMsg: React.Dispatch<React.SetStateAction<string>>;
  // State to manage the Error Notification
  toggleErrorNoti: boolean;
  setToggleErrorNoti: React.Dispatch<React.SetStateAction<boolean>>;
  // Function to call the Error notification
  toggleErrorNotiSetter: () => void;

  // State to manage the Error Notification Message
  successNotiMsg: string;
  setSuccessNotiMsg: React.Dispatch<React.SetStateAction<string>>;
  // State to manage the Error Notification
  toggleSuccessNoti: boolean;
  setToggleSuccessNoti: React.Dispatch<React.SetStateAction<boolean>>;
  // Function to call the Error notification
  toggleSuccessNotiSetter: () => void;

  // State to manage the Error Notification Message
  taskNotiMsg: string;
  setTaskNotiMsg: React.Dispatch<React.SetStateAction<string>>;
  // State to manage the Error Notification
  toggleTaskNoti: boolean;
  setToggleTaskNoti: React.Dispatch<React.SetStateAction<boolean>>;
  // Function to call the Error notification
  toggleTaskNotiSetter: () => void;

  // State to manage the Menu for Small Screens
  menuS: boolean;
  setMenuS: React.Dispatch<React.SetStateAction<boolean>>;

  // State to set the User
  user: string | null;
  // Function to Register the User
  register: (email: string, password: string) => Promise<void>;
  // Function to Login the User
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; user: string }>;
  // State to manage the logout confirmation panel
  toggleLogout: boolean | null;
  setToggleLogout: React.Dispatch<React.SetStateAction<boolean | null>>;
  // Function to Logout the User
  logout: () => void;

  // State to manage the User's Notes
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  // Function to get the Notes via the API
  fetchNotes: (token: string) => Promise<Note[] | null>;
  // Function to set the User's notes to the Notes State
  setNote: (token: string) => void;
  // Function to add a new Note via API
  addNote: (title: string, content: string) => Promise<void>;
  // Function to edit the Note via API
  updateNote: (
    id: string,
    updatedData: { [key: string]: string }
  ) => Promise<void>;

  // State to manage the trashed notes
  trashedNoteState: Note[];
  setTrashedNoteState: React.Dispatch<React.SetStateAction<Note[]>>;
  // Function to move a Note to the Trash Collection via API
  moveToTrash: (noteId: string) => Promise<void>;
  // Functions to get the Notes from the Trash Collection via API
  getTrashNotes: (noteId: string) => Promise<void>;
  // Functions to set the Notes to the State from the Trash Collection via API
  setTrashNote: (token: string) => void;
  // Function to restore a Note from the Trash Collection
  restoreTrashNote: (noteId: string) => Promise<void>;
  // Function to delete the Note from the Database permanently
  deleteFromTrash: (noteId: string) => Promise<void>;
  // Function to delete all the Notes Permanently from the Database
  deleteNotePermanently: () => Promise<void>;
};

// Context Creation
const GlobalContext = createContext<GlobalContextType | null>(null);

// GlobalProvider Component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Router
  const router = useRouter();

  // State to manage the Add New Note Panel
  const [addPanel, setAddPanel] = useState<boolean>(false);
  // Function to toggle the Add New Note Panel
  const toggleAddPanel = () => {
    setAddPanel((prev) => !prev);
  };

  // State to manage the Error Notification
  const [toggleErrorNoti, setToggleErrorNoti] = useState<boolean>(false);
  // State to manage the Message for the Error Notification
  const [errorNotiMsg, setErrorNotiMsg] = useState<string>("");
  // Reference to clear the Error Notification
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State to manage the Error Notification
  const [toggleSuccessNoti, setToggleSuccessNoti] = useState<boolean>(false);
  // State to manage the Message for the Error Notification
  const [successNotiMsg, setSuccessNotiMsg] = useState<string>("");
  // Reference to clear the Error Notification
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State to manage the Error Notification
  const [toggleTaskNoti, setToggleTaskNoti] = useState<boolean>(false);
  // State to manage the Message for the Error Notification
  const [taskNotiMsg, setTaskNotiMsg] = useState<string>("");
  // Reference to clear the Error Notification
  const taskTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to toggle the Error Notification State
  const toggleErrorNotiSetter = () => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToggleErrorNoti(true);

    errorTimeoutRef.current = setTimeout(() => {
      setToggleErrorNoti(false);
      setErrorNotiMsg("");
    }, 5000);
  };

  // Function to toggle the Error Notification State
  const toggleSuccessNotiSetter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    setToggleSuccessNoti(true);

    timeoutRef.current = setTimeout(() => {
      setToggleSuccessNoti(false);
      setErrorNotiMsg("");
    }, 5000);
  };

  // Function to toggle the Error Notification State
  const toggleTaskNotiSetter = () => {
    if (taskTimeoutRef.current) {
      clearTimeout(taskTimeoutRef.current);
    }

    setToggleTaskNoti(true);

    timeoutRef.current = setTimeout(() => {
      setToggleTaskNoti(false);
      setTaskNotiMsg("");
    }, 5000);
  };

  // State to manage the Profile Menu
  const [profileMenu, setProfileMenu] = useState(false);

  // State to manage the Menu for Small Screens
  const [menuS, setMenuS] = useState(false);

  // State to manage the User Registration
  const [user, setUser] = useState<string | null>(null);
  // Function to handle User Registration
  const register = async (email: string, password: string): Promise<void> => {
    try {
      if (!email || !password) {
        setErrorNotiMsg("All fields are required, please try again.");
        toggleErrorNotiSetter();
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorNotiMsg(errorData.error || "Failed to register the user.");
        toggleErrorNotiSetter();
        // console.log("Failed to register user.");
      } else {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorNotiMsg(error.message || "An unexpected error occurred.");
      } else {
        setErrorNotiMsg("An unexpected error occurred.");
      }
      toggleErrorNotiSetter();
      throw error;
    }
  };
  // Function to handle user login
  const login = async (
    email: string,
    password: string
  ): Promise<{ token: string; user: string }> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorNotiMsg(errorData.error || "Login Failed");
        toggleErrorNotiSetter();
        throw new Error(errorData.error || "Login failed!");
      }

      const data = await response.json();

      if (!data.token || !data.user) {
        setErrorNotiMsg("Token or UserID not found.");
        toggleErrorNotiSetter();
        throw new Error("Token or UserID not found.");
      }

      setUser(data.user);

      return { token: data.token, user: data.user };
    } catch (error) {
      if (error instanceof Error) {
        setErrorNotiMsg(error.message || "An unexpected error occurred.");
      } else {
        setErrorNotiMsg("An unexpected error occurred.");
      }
      toggleErrorNotiSetter();
      throw error;
    }
  };
  // State to manage the logout confirmation panel
  const [toggleLogout, setToggleLogout] = useState<boolean | null>(null);
  // Function to handle the logout functionality
  const logout = () => {
    // const confirmLogout = window.confirm("are you sure you want to log out?");
    // if (!confirmLogout) return;
    if (toggleLogout) {
      setUser(null);
      setNotes([]);
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/auth/login");
      setToggleLogout(null);
    }
  };

  // State to manage the notes
  const [notes, setNotes] = useState<Note[]>([]);
  const fetchNotes = async (token: string): Promise<Note[] | null> => {
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();

      if (data.notes && Array.isArray(data.notes)) {
        const sortedNotes = data.notes.sort((a: Note, b: Note) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        });

        return sortedNotes;
      } else {
        console.error("unexpected data structure:", data);
        return null;
      }
    } catch (error) {
      console.error("Fetch notes error:", error);
      return null;
    }
  };
  // Function to set the Notes to the Notes State
  const setNote = async (token: string) => {
    // const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const notesData = await fetchNotes(token);

    if (notesData) {
      setNotes(notesData);
    }
  };
  // Function to handle add a new note functionality
  const addNote = async (title: string, content: string): Promise<void> => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      console.log("Note added successfully");
      setNote(token);

      setAddPanel((prev) => !prev);
      setTaskNotiMsg("New Note has been added.");
      toggleTaskNotiSetter();
    } catch (error) {
      console.error("Add note error:", error);
    }
  };
  // Function to handle edit note functionality
  const updateNote = async (
    id: string,
    updatedNote: { [key: string]: string }
  ) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await fetch("/api/notes/create", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
        body: JSON.stringify({ id, ...updatedNote }),
      });

      if (!response.ok) {
        console.log("Error");
      }

      setTaskNotiMsg("The note has been updated.");
      toggleTaskNotiSetter();

      setNotes((prevNotes) =>
        prevNotes.map((existingNote) =>
          existingNote._id === id
            ? { ...existingNote, ...updatedNote }
            : existingNote
        )
      );
    } catch (error) {
      console.error("Update note error:", error);
    }
  };

  // State to manage the trashed notes
  const [trashedNoteState, setTrashedNoteState] = useState<Note[]>([]);
  // Function to call the Trash API
  const moveToTrash = async (noteId: string): Promise<void> => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token is missing!");
      return;
    }

    try {
      const response = await fetch("/api/notes/trash", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
        body: JSON.stringify({ noteId }),
      });

      if (!response.ok) {
        throw new Error("Failed to move the note to the trash. Try again");
      }

      setTaskNotiMsg("The note has been moved to trash.");
      toggleTaskNotiSetter();

      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      // console.log("Note moved to trash successfully");
    } catch (error) {
      console.error("Failed to trash note:", error);
    }
  };
  // Function to call the Trash Notes Getter API
  const getTrashNotes = async (token: string) => {
    try {
      const response = await fetch("/api/notes/trash", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trash notes. Try again");
      }

      const data = await response.json();

      const trashedNotes = data.trashedNotes.map((note: Note) => ({
        ...note,
        deletedAt: new Date(note.deletedAt || 0),
      }));

      trashedNotes.sort((a: Note, b: Note) => {
        const dateA = a.deletedAt ? new Date(a.deletedAt).getTime() : 0;
        const dateB = b.deletedAt ? new Date(b.deletedAt).getTime() : 0;
        return dateB - dateA;
      });

      return await data.trashedNotes;
    } catch (error) {
      console.error("Failed to fetch trash notes:", error);
      return null;
    }
  };
  const setTrashNote = async (token: string) => {
    // const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const trashNotesData = await getTrashNotes(token);

    if (trashNotesData) {
      setTrashedNoteState(trashNotesData);
    }
  };
  // Function to restore a note from the trash collection
  const restoreTrashNote = async (noteId: string): Promise<void> => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token is missing!");
      return;
    }

    try {
      const response = await fetch("/api/notes/restore", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
        body: JSON.stringify({ noteId }),
      });

      if (!response.ok) {
        throw new Error("Failed to restore the note. Try again");
      }

      setTaskNotiMsg("The note has been recovered.");
      toggleTaskNotiSetter();

      setTrashedNoteState((prev) => prev.filter((note) => note._id !== noteId));
      console.log("Note has been recovered successfully.");
    } catch (error) {
      console.error("Failed to trash note:", error);
    }
  };
  // Function to delete a note permanently from the trash collection
  const deleteFromTrash = async (noteId: string) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token is missing!");
      return;
    }

    try {
      const response = await fetch("/api/notes/trash", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
        body: JSON.stringify({ noteId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete the note");
      }

      setTaskNotiMsg("The note has been deleted permanently.");
      toggleTaskNotiSetter();

      setTrashedNoteState((prevState) =>
        prevState.filter((note) => note._id !== noteId)
      );

      await getTrashNotes(token);

      // return result;
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };
  // Function to delete all notes permanently from the database
  const deleteNotePermanently = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token is missing!");
        return;
      }

      const response = await fetch("/api/notes/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization-Token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the note.");
      }

      await getTrashNotes(token);

      setTaskNotiMsg("All of the notes have been deleted.");
      toggleTaskNotiSetter();

      // location.reload();

      console.log("Note deleted permanently successfully");
    } catch (error) {
      console.error("Failed to delete note permanently:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        addPanel,
        setAddPanel,
        toggleAddPanel,
        errorNotiMsg,
        setErrorNotiMsg,
        toggleErrorNoti,
        setToggleErrorNoti,
        toggleErrorNotiSetter,
        successNotiMsg,
        setSuccessNotiMsg,
        toggleSuccessNoti,
        setToggleSuccessNoti,
        toggleSuccessNotiSetter,
        taskNotiMsg,
        setTaskNotiMsg,
        toggleTaskNoti,
        setToggleTaskNoti,
        toggleTaskNotiSetter,
        menuS,
        setMenuS,
        user,
        register,
        login,
        logout,
        toggleLogout,
        setToggleLogout,
        notes,
        setNotes,
        fetchNotes,
        setNote,
        addNote,
        updateNote,
        moveToTrash,
        getTrashNotes,
        setTrashNote,
        trashedNoteState,
        setTrashedNoteState,
        restoreTrashNote,
        deleteFromTrash,
        deleteNotePermanently,
        profileMenu,
        setProfileMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
