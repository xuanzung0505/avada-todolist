import { useContext } from "react";
import { AppContext } from "~/App";
import Input from "~/components/Input";

function IndexPage() {
  const { context } = useContext(AppContext);
  const { taskList } = context;
  return (
    <div className="flex justify-center bg-slate-100 h-full">
      <div className="flex items-center lg:justify-center flex-col lg:flex-row w-full">
        <div className="w-full text-center lg:w-2/5 lg:p-12 lg:hover:-translate-y-3 transition-all">
          <span className="font-bold text-red-500 md:text-3xl lg:text-5xl">
            To-do
          </span>
          <span className="font-bold text-purple-500 md:text-3xl lg:text-5xl">
            <br></br>Application
          </span>
        </div>
        <div className="rounded-md lg:rounded-2xl text-center lg:w-3/5 lg:p-12 bg-purple-200 m-4 flex flex-col w-[90%]">
          <Input />
          <div className="p-1 text-left flex flex-col gap-y-1">
            {taskList.map((task) => {
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-sm p-1 flex hover:bg-green-400 cursor-pointer group/task"
                >
                  <div className="grow">{task.title}</div>
                  <button className="grow-0 border border-red-500 rounded-md hover:bg-red-500 group/deleteTask">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 bg-white rounded-md text-red-500 group-hover/deleteTask:text-white group-hover/deleteTask:bg-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
