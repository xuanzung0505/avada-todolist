import {
  BlockStack,
  Checkbox,
  InlineError,
  Modal,
  TextField,
} from "@shopify/polaris";
import { PageContentEditHook } from "../PageContentHooks";
import { Task } from "~/models/Task";
import { useContext } from "react";
import { AppContext } from "~/App";

export default function EditModal({
  activeEditModal,
  toggleEditModal,
  currentEditTask,
  setCurrentEditTask,
  setEditFormTitle,
  setEditFormIsCompleted,
  editFormTitle,
  editFormIsCompleted,
}: {
  activeEditModal: boolean;
  toggleEditModal: (id?: string) => void;
  currentEditTask: Task | null;
  setCurrentEditTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setEditFormTitle: (value: React.SetStateAction<string>) => void;
  setEditFormIsCompleted: (value: React.SetStateAction<boolean>) => void;
  editFormTitle: string;
  editFormIsCompleted: boolean;
}) {
  const { context, setContext } = useContext(AppContext);
  const { taskList } = context;

  const { editFormError, setEditFormError } = PageContentEditHook();

  const handleIsCompletedChange = (value: boolean) => {
    setEditFormIsCompleted(value);
  };

  const handleTaskTitleChange = (value: string) => {
    setEditFormTitle(value);
    if (editFormError) setEditFormError(null);
  };

  function handleEditClose() {
    setEditFormError(null);
    setCurrentEditTask(null);
    setEditFormTitle("");
    setEditFormIsCompleted(false);
    toggleEditModal();
  }

  function handleEditSubmit(newTaskValue: Omit<Task, "id">) {
    if (newTaskValue.title === "") {
      setEditFormError({
        title: "Title is required",
      });
    } else {
      const newTaskList = taskList.map((task) => {
        if (task.id === currentEditTask!.id) {
          return {
            ...task,
            ...newTaskValue,
          };
        }
        return task;
      });
      setContext({ ...context, taskList: newTaskList });
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
      handleEditClose();
    }
  }

  return (
    <Modal
      open={activeEditModal}
      onClose={() => {
        handleEditClose();
      }}
      title="Edit your task"
      primaryAction={{
        destructive: true,
        content: "Discard changes",
        onAction: () => {
          toggleEditModal();
        },
      }}
      secondaryActions={[
        {
          content: "Save",
          onAction: () => {
            handleEditSubmit({
              title: editFormTitle,
              completed: editFormIsCompleted,
            });
          },
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap={"500"}>
          <TextField
            label="Title"
            value={editFormTitle}
            onChange={handleTaskTitleChange}
            autoComplete="off"
            type="text"
            helpText={<span>Your task title (eg: Swim)</span>}
          />
          <Checkbox
            label="Completed"
            checked={editFormIsCompleted}
            onChange={handleIsCompletedChange}
          />
          {editFormError &&
            Object.keys(editFormError).map((key, index) => (
              <InlineError
                key={index}
                message={(editFormError as { [key: string]: string })[key]}
                fieldID={key}
              />
            ))}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
