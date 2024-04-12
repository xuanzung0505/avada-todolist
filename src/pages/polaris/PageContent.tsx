import {
  ResourceList,
  ResourceItem,
  Text,
  Card,
  ButtonGroup,
  Button,
  InlineStack,
  Badge,
} from "@shopify/polaris";
import type { ResourceListProps } from "@shopify/polaris";
import { useContext, useState } from "react";
import { DeleteIcon } from "@shopify/polaris-icons";
import { AppContext } from "~/App";
import { Task } from "~/models/Task";
import { PageContentEditHook } from "./PageContentHooks";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

function TaskListResourceConfig(
  bulkCompletedState: (newState: boolean) => void,
  bulkDelete: () => void
) {
  const resourceName = {
    singular: "task",
    plural: "tasks",
  };
  const promotedBulkActions = [
    {
      content: "Mark as complete",
      onAction: () => {
        bulkCompletedState(true);
      },
    },
  ];
  const bulkActions = [
    {
      content: "Mark as incomplete",
      onAction: () => {
        bulkCompletedState(false);
      },
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete tasks",
      onAction: () => {
        bulkDelete();
      },
    },
  ];

  return { resourceName, promotedBulkActions, bulkActions };
}

export default function PageContent() {
  const { context, setContext } = useContext(AppContext);
  const taskList = [
    ...context.taskList.filter((task) => task.completed === false),
    ...context.taskList.filter((task) => task.completed === true),
  ];
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps["selectedItems"]
  >([]);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  function renderItem(item: (typeof taskList)[number]) {
    const { id, title, completed } = item;
    return (
      <ResourceItem id={id} verticalAlignment="fill" onClick={() => {}}>
        <InlineStack blockAlign="baseline" align="space-between">
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <ButtonGroup>
            <Badge tone={completed === true ? "success" : "attention"}>
              {completed === true ? "Completed" : "Incompleted"}
            </Badge>
            <Button
              variant="primary"
              onClick={() => {
                toggleEditModal(id);
              }}
              disabled={selectedItems && selectedItems.length > 0}
            >
              Edit
            </Button>
            <Button
              tone="critical"
              onClick={() => {
                setCurrentDeleteTasks([item]);
                toggleDeleteModal();
              }}
              disabled={selectedItems && selectedItems.length > 0}
            >
              Delete
            </Button>
          </ButtonGroup>
        </InlineStack>
      </ResourceItem>
    );
  }
  const { resourceName, promotedBulkActions, bulkActions } =
    TaskListResourceConfig(
      (newState: boolean) => {
        const map = new Map();
        (selectedItems as string[]).forEach((id, index) => {
          map.set(id, index);
        });
        const newTaskList = taskList.map((task) => {
          if (map.get(task.id) !== undefined) {
            return { ...task, completed: newState };
          }
          return task;
        });
        setContext({ ...context, taskList: newTaskList });
        localStorage.setItem("taskList", JSON.stringify(newTaskList));
        setSelectedItems([]);
      },
      () => {
        const map = new Map();
        (selectedItems as string[]).forEach((id, index) => {
          map.set(id, index);
        });
        const deleteTaskList = taskList.filter((task) => {
          return map.get(task.id) !== undefined;
        });
        setCurrentDeleteTasks(deleteTaskList);
        toggleDeleteModal();
      }
    );
  const {
    activeEditModal,
    setActiveEditModal,
    currentEditTask,
    setCurrentEditTask,
    setEditFormTitle,
    setEditFormIsCompleted,
    editFormTitle,
    editFormIsCompleted,
  } = PageContentEditHook();
  const [currentDeleteTasks, setCurrentDeleteTasks] = useState<Task[] | null>(
    null
  );
  const toggleEditModal = (id?: string) => {
    setActiveEditModal((active) => !active);
    if (id) {
      const currentTask = taskList.find((task) => task.id === id) as Task;
      setCurrentEditTask(currentTask);
      setEditFormTitle(currentTask.title);
      setEditFormIsCompleted(currentTask.completed);
    }
  };
  const toggleDeleteModal = () => {
    setActiveDeleteModal((active) => !active);
  };

  return (
    <>
      {taskList.length > 0 ? (
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={taskList}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
          />
        </Card>
      ) : (
        <Card>
          <Text as="p" variant="bodyMd" tone="success">
            Your list is empty, click "Create" to add new tasks
          </Text>
        </Card>
      )}

      <EditModal
        {...{
          activeEditModal,
          toggleEditModal,
          currentEditTask,
          setCurrentEditTask,
          setEditFormTitle,
          setEditFormIsCompleted,
          editFormTitle,
          editFormIsCompleted,
        }}
      />
      <DeleteModal
        {...{
          activeDeleteModal,
          toggleDeleteModal,
          currentDeleteTasks,
          setCurrentDeleteTasks,
          setSelectedItems,
        }}
      />
    </>
  );
}
