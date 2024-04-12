import {
  BlockStack,
  Checkbox,
  InlineError,
  Modal,
  TextField,
} from "@shopify/polaris";
import { PageContentAddHook } from "../PageContentHooks";
import { Task } from "~/models/Task";
import { useContext } from "react";
import { AppContext } from "~/App";

export default function AddModal({
  toggleAddModal,
  activeAddModal,
}: {
  toggleAddModal: () => void;
  activeAddModal: boolean;
}) {
  const { context, setContext } = useContext(AppContext);
  const { taskList } = context;
  const {
    addFormError,
    setAddFormError,
    addFormTitle,
    setAddFormTitle,
    addFormIsCompleted,
    setAddFormIsCompleted,
  } = PageContentAddHook();

  const handleIsCompletedChange = (value: boolean) => {
    setAddFormIsCompleted(value);
  };

  const handleTaskTitleChange = (value: string) => {
    setAddFormTitle(value);
    if (addFormError) setAddFormError(null);
  };

  function handleAddTask() {
    const newTask = new Task({
      title: addFormTitle,
      completed: addFormIsCompleted,
    });
    const newTaskList = [...taskList, newTask];
    setContext({ ...context, taskList: newTaskList });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    toggleAddModal();
  }

  return (
    <Modal
      open={activeAddModal}
      onClose={() => {
        toggleAddModal();
      }}
      title="Add a new task"
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => {
            toggleAddModal();
          },
        },
      ]}
      primaryAction={{
        content: "Save",
        onAction: () => {
          handleAddTask();
        },
      }}
    >
      <Modal.Section>
        <BlockStack gap={"500"}>
          <TextField
            label="Title"
            value={addFormTitle}
            onChange={handleTaskTitleChange}
            autoComplete="off"
            type="text"
            helpText={<span>Your task title (eg: Swim)</span>}
          />
          <Checkbox
            label="Completed"
            checked={addFormIsCompleted}
            onChange={handleIsCompletedChange}
          />
          {addFormError &&
            Object.keys(addFormError).map((key, index) => (
              <InlineError
                key={index}
                message={(addFormError as { [key: string]: string })[key]}
                fieldID={key}
              />
            ))}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
