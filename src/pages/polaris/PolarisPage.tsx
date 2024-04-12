import { AppProvider, Button, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import PageContent from "./PageContent";
import { PageContentAddHook } from "./PageContentHooks";
import AddModal from "./components/AddModal";

function PolarisPage() {
  const { activeAddModal, setActiveAddModal } = PageContentAddHook();
  function toggleAddModal() {
    setActiveAddModal(!activeAddModal);
  }
  return (
    <AppProvider i18n={enTranslations}>
      <Page
        title="Todoes"
        primaryAction={
          <Button
            variant="primary"
            onClick={() => {
              toggleAddModal();
            }}
          >
            Create
          </Button>
        }
      >
        <PageContent />
        <AddModal {...{ toggleAddModal, activeAddModal, setActiveAddModal }} />
      </Page>
    </AppProvider>
  );
}

export default PolarisPage;
