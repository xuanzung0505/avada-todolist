import { Modal } from "@shopify/polaris";
import { ResourceListSelectedItems } from "@shopify/polaris/build/ts/src/utilities/resource-list";
import { useContext } from "react";
import { AppContext } from "~/App";
import { Task } from "~/models/Task";

function DeleteModal({
  activeDeleteModal,
  toggleDeleteModal,
  currentDeleteTasks,
  setCurrentDeleteTasks,
  setSelectedItems,
}: {
  activeDeleteModal: boolean;
  toggleDeleteModal: (id?: string) => void;
  currentDeleteTasks: Task[] | null;
  setCurrentDeleteTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
  setSelectedItems: (
    value: React.SetStateAction<ResourceListSelectedItems | undefined>
  ) => void;
}) {
  const { context, setContext } = useContext(AppContext);
  const { taskList } = context;

  function handleDeleteSubmit() {
    const map = new Map();
    (currentDeleteTasks as Task[]).forEach((task, index) => {
      map.set(task.id, index);
    });
    const newTaskList = taskList.filter((task) => {
      return map.get(task.id) === undefined;
    });
    console.log(newTaskList);
    setContext({ ...context, taskList: newTaskList });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setCurrentDeleteTasks([]);
    setSelectedItems([]);
    toggleDeleteModal();
  }

  return (
    <Modal
      open={activeDeleteModal}
      onClose={() => {
        toggleDeleteModal();
      }}
      title={
        currentDeleteTasks !== null
          ? currentDeleteTasks.length === 1
            ? `Delete "${currentDeleteTasks[0].title}"`
            : `Delete ${currentDeleteTasks.length} tasks`
          : ""
      }
      primaryAction={{
        destructive: true,
        content: "Yes",
        onAction: () => {
          handleDeleteSubmit();
        },
      }}
      secondaryActions={[
        {
          content: "No",
          onAction: () => {
            setCurrentDeleteTasks([]);
            toggleDeleteModal();
          },
        },
      ]}
    >
      <Modal.Section>
        Are you sure you want to delete{" "}
        {currentDeleteTasks?.length === 1
          ? "this task"
          : `(${currentDeleteTasks?.length}) tasks`}
        ?
      </Modal.Section>
    </Modal>
  );
}

export default DeleteModal;
