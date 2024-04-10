import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import IndexPage from "./pages/index";
import { Task } from "./models/Task";

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

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <IndexPage />
    </AppContext.Provider>
  );
}

export default App;
