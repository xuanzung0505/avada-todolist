import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { Task } from "./models/Task";
import useRouteElements from "./useRouteElements";

const defaultContextValue = {
  taskList:
    (JSON.parse(localStorage.getItem("taskList") ?? "[]") as Task[]) ?? [],
};
export const AppContext = createContext<{
  context: { taskList: Task[] };
  setContext: Dispatch<
    SetStateAction<{
      taskList: Task[];
    }>
  >;
}>({ context: { taskList: [] }, setContext: () => {} });

function App() {
  const [context, setContext] = useState(defaultContextValue);
  const routeElements = useRouteElements();

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {routeElements}
    </AppContext.Provider>
  );
}

export default App;
