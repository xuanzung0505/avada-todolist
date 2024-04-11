import { useContext } from "react";
import { AppContext } from "~/App";
import Input from "~/components/Input";
import Task from "~/components/Task";
import classnames from "classnames";

function IndexPage() {
  const { context } = useContext(AppContext);
  const finishedTask = context.taskList.filter(
    (task) => task.completed === true
  );
  const unfinishedTask = context.taskList.filter(
    (task) => task.completed === false
  );
  return (
    <div className="flex justify-center bg-slate-100 h-full">
      <div className="flex items-center lg:justify-center flex-col lg:flex-row w-full">
        <div
          className={classnames(
            "w-full text-center lg:w-2/5 lg:p-12 lg:hover:-translate-y-3 transition-all"
          )}
        >
          <span className="font-bold text-red-500 md:text-3xl lg:text-5xl">
            To-do
          </span>
          <span className="font-bold text-purple-500 md:text-3xl lg:text-5xl">
            <br></br>Application
          </span>
        </div>
        <div
          className={classnames(
            "rounded-md lg:rounded-2xl text-center lg:w-3/5 lg:p-12",
            "bg-purple-200 m-4 flex flex-col w-[90%]"
          )}
        >
          <Input />
          <div className="p-1 text-left flex flex-col gap-y-1">
            {unfinishedTask.length > 0 ? (
              unfinishedTask.map((task) => {
                return <Task key={task.id} {...task} />;
              })
            ) : (
              <div className="text-red-500 md:font-extrabold md:text-xl font-bold text-sm">
                Hurray! You've finished all your tasks
              </div>
            )}
          </div>
          <hr className="border-purple-600 border-dashed" />
          <div className="p-1 text-left flex flex-col gap-y-1">
            {finishedTask.length > 0 ? (
              finishedTask.map((task) => {
                return <Task key={task.id} {...task} />;
              })
            ) : (
              <div className="text-gray-400 italic">
                Nothing to show here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
