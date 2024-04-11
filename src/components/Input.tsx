import { useContext, useState } from "react";
import { Flip, toast } from "react-toastify";
import { AppContext } from "~/App";
import { Task } from "~/models/Task";

function Input() {
  const { context, setContext } = useContext(AppContext);
  const [newTask, setNewTask] = useState("");
  const handleTaskChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTask(e.target.value);
  };
  const handleAddTask = () => {
    // setContext()
    if (newTask === "")
      toast.error("Task name should not be empty!", {
        autoClose: 2000,
        transition: Flip,
      });
    else {
      const newTaskObject = new Task({ title: newTask, completed: false });
      const { taskList } = context;
      setContext({ ...context, taskList: [...taskList, newTaskObject] });
      localStorage.setItem(
        "taskList",
        JSON.stringify([...taskList, newTaskObject])
      );
      setNewTask("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <div className="flex text-sm p-1 w-full justify-center">
        <input
          onChange={handleTaskChange}
          type="text"
          className="w-[90%] p-0.5 rounded-l-sm border-y border-l border-black"
          placeholder="Enter your task (eg: swim)"
          value={newTask}
        ></input>
        <button
          className="p-0.5 rounded-r-sm items-center border border-black group hover:bg-green-500 transition-all"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 group-hover:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default Input;
