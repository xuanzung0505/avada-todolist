import { useContext } from "react";
import { AppContext } from "~/App";
import classnames from "classnames";

function Task({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) {
  const { context, setContext } = useContext(AppContext);
  const { taskList } = context;

  function handleFinishTask() {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.completed = true;
      return task;
    });
    setContext({
      ...context,
      taskList: newTaskList,
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
  }

  function handleDeleteTask(e: React.MouseEvent) {
    e.stopPropagation();
    const newTaskList = taskList.filter((task) => task.id != id);
    setContext({
      ...context,
      taskList: newTaskList,
    });
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
  }

  return completed === true ? (
    <div key={id} className="rounded-md p-1 flex bg-gray-100">
      <div className="grow border border-gray-100 text-gray-400 group-hover/task:text-white">
        {title}
      </div>
    </div>
  ) : (
    <div
      key={id}
      className="bg-white rounded-md p-1 flex hover:bg-green-400 transition-all cursor-pointer group/task"
      onClick={handleFinishTask}
    >
      <div className="grow text-purple-600 group-hover/task:text-white">
        {title}
      </div>

      <button
        className="grow-0 border border-red-500 rounded-md hover:bg-red-500 group/deleteTask
                 group-hover/task:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 bg-white rounded-md transition-all text-red-500 group-hover/deleteTask:text-white group-hover/deleteTask:bg-red-500
                     "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button
        className={classnames(
          "grow-0 rounded-md hover:border-red-500 hidden group-hover/task:block",
          "border border-green-400 group/check"
        )}
        onClick={handleDeleteTask}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white group-hover/check:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={classnames(
            "w-6 h-6 bg-white rounded-md transition-all group-hover/check:text-white",
            "group-hover/check:bg-red-500 group-hover/check:block hidden"
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default Task;
