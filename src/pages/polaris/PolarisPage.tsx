import { AppProvider, Button, Page } from "@shopify/polaris";
// import FrameExample from "~/components/FrameExample";
import enTranslations from "@shopify/polaris/locales/en.json";
import PageContent from "./PageContent";
function PolarisPage() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page
        title="Todoes"
        primaryAction={<Button variant="primary">Create</Button>}
      >
        <PageContent />
      </Page>
    </AppProvider>
  );
}
// <FrameExample />

export default PolarisPage;
