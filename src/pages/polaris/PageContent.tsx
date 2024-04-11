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
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

export default function PageContent() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps["selectedItems"]
  >([]);
  const { context, setContext } = useContext(AppContext);
  const shopify = useAppBridge();

  const resourceName = {
    singular: "task",
    plural: "tasks",
  };

  const items = context.taskList;

  const promotedBulkActions = [
    {
      content: "Mark as complete",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
  ];

  const bulkActions = [
    {
      content: "Mark as incomplete",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete tasks",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  function renderItem(item: (typeof items)[number]) {
    const { id, title, completed } = item;

    return (
      <ResourceItem id={id} verticalAlignment="fill" onClick={() => {}}>
        <InlineStack blockAlign="baseline" align="space-between">
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <ButtonGroup>
            <Badge tone={completed === true ? "success" : "attention"}>
              {completed === true ? "Completed" : "Uncompleted"}
            </Badge>
            <Button
              variant="primary"
              onClick={() => shopify.modal.show("my-modal")}
            >
              Edit
            </Button>
            <Button tone="critical">Delete</Button>
          </ButtonGroup>
        </InlineStack>
        <Modal id="my-modal">
          <p>Message</p>
          <TitleBar title="Title">
            <button variant="primary">Label</button>
            <button onClick={() => shopify.modal.hide("my-modal")}>
              Label
            </button>
          </TitleBar>
        </Modal>
      </ResourceItem>
    );
  }

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
      />
    </Card>
  );
}
