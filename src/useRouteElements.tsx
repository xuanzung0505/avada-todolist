import { useRoutes } from "react-router-dom";
import IndexPage from "./pages/index";
import PolarisPage from "./pages/polaris";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <IndexPage />,
    },
    {
      path: "/polaris",
      element: <PolarisPage />,
    },
  ]);

  return routeElements;
}
