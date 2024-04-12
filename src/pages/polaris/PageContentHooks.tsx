import { useState } from "react";
import { EditFormError } from "~/models/Others";
import { Task } from "~/models/Task";

export const PageContentEditHook = () => {
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [editFormError, setEditFormError] = useState<EditFormError | null>(
    null
  );
  const [currentEditTask, setCurrentEditTask] = useState<Task | null>(null);
  const [editFormTitle, setEditFormTitle] = useState("");
  const [editFormIsCompleted, setEditFormIsCompleted] = useState(false);
  return {
    activeEditModal,
    setActiveEditModal,
    editFormError,
    setEditFormError,
    currentEditTask,
    setCurrentEditTask,
    editFormTitle,
    setEditFormTitle,
    editFormIsCompleted,
    setEditFormIsCompleted,
  };
};

export const PageContentAddHook = () => {
  const [activeAddModal, setActiveAddModal] = useState(false);
  const [addFormError, setAddFormError] = useState<EditFormError | null>(null);
  const [addFormTitle, setAddFormTitle] = useState("");
  const [addFormIsCompleted, setAddFormIsCompleted] = useState(false);
  return {
    activeAddModal,
    setActiveAddModal,
    addFormError,
    setAddFormError,
    addFormTitle,
    setAddFormTitle,
    addFormIsCompleted,
    setAddFormIsCompleted,
  };
};
