import {useName, useRequest} from "@/hooks"
import {clsx, getter, poster} from "@/libs"
import {AddIcon} from "@/widgets/Icons"
import {Tab} from "@headlessui/react"
import {motion} from "framer-motion"
import {ChangeEvent, useState} from "react"
import {toast} from "react-toastify"

const categories = ["TODO", "DONE", "ALL"]

export const Todos = () => {
  const name = useName()
  const {data, mutate} = useRequest<Todo[]>("/todos", getter)

  const [newTodo, setNewTodo] = useState<string>("")

  const handleNewTodo = (event: ChangeEvent<HTMLInputElement>) => setNewTodo(event.currentTarget.value)

  const handleAddTodo = async () => {
    if (!newTodo) toast("content is empty!")
    else if (data && data.filter(d => d.content === newTodo).length) toast("already exist!")

    else {
      const res = await poster("/todo", {name, content: newTodo})
      setNewTodo("")
      await mutate()
    }

  }

  return <div className={"w-full max-w-2xl lg:max-w-4xl mx-auto px-2 py-4 sm:px-0"}>
    <div className={"flex items-center justify-between mt-4 mb-8"}>
      <input
        placeholder={"add new todo item"}
        value={newTodo}
        onChange={handleNewTodo}
        className={"w-4/5 pl-4 pr-3 py-2.5 rounded-md bg-gray-100 ring-inset duration-100 " +
          "focus:outline-none focus:border-0 focus:ring-1.5 focus:ring-indigo-300 " +
          "focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:caret-gray-600"}
      />

      <button
        className={"flex items-center justify-center space-x-1 w-28 lg:w-32 py-2.5 rounded-md text-center text-white fill-white bg-indigo-300"}
        onClick={handleAddTodo}
      >
        <AddIcon className={"w-5 h-5"}/>
        <span>Add</span>
      </button>
    </div>

    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-300/20 p-1">
        {categories.map((category) => (
          <Tab
            key={category}
            className={({selected}) =>
              clsx(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-500/90",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-300 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-400 hover:bg-blue-400/20 hover:text-white"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={clsx(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400/80 focus:outline-none focus:ring-2"
          )}
        >
          <motion.ul layout className={"space-y-2"}>
            {data && data.map((todo, index) =>
              <li
                key={todo._id}
                className={"relative rounded-md p-3 hover:bg-gray-50"}
              >
                <h3 className={"text-sm font-medium leading-5"}>
                  {todo.content}
                </h3>

                <ul className={"mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"}>
                  <li>{todo.createAt}</li>
                  <li>&middot;</li>
                  <li>{1} comments</li>
                  <li>&middot;</li>
                  <li>{4} shares</li>
                </ul>

                <a
                  href="#"
                  className={clsx(
                    "absolute inset-0 rounded-md",
                    "ring-blue-400/80 focus:z-10 focus:outline-none focus:ring-2"
                  )}
                />
              </li>
            )}
          </motion.ul>
        </Tab.Panel>

        <Tab.Panel
          className={clsx(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400/80 focus:outline-none focus:ring-2"
          )}
        >
          <motion.ul layout className={"space-y-2"}>
            {data && data.map((todo, index) =>
              <li
                key={todo._id}
                className={"relative rounded-md p-3 hover:bg-gray-50"}
              >
                <h3 className={"text-sm font-medium leading-5"}>
                  {todo.content}
                </h3>

                <ul className={"mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"}>
                  <li>{todo.createAt}</li>
                  <li>&middot;</li>
                  <li>{1} comments</li>
                  <li>&middot;</li>
                  <li>{4} shares</li>
                </ul>

                <a
                  href="#"
                  className={clsx(
                    "absolute inset-0 rounded-md",
                    "ring-blue-400/80 focus:z-10 focus:outline-none focus:ring-2"
                  )}
                />
              </li>
            )}
          </motion.ul>
        </Tab.Panel>

        <Tab.Panel
          className={clsx(
            "rounded-xl bg-white p-3",
            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400/80 focus:outline-none focus:ring-2"
          )}
        >
          <ul className={"space-y-2"}>
            {data && data.map((todo, index) =>
              <li
                key={todo._id}
                className={"relative rounded-md p-3 hover:bg-gray-50"}
              >
                <h3 className={"text-sm font-medium leading-5"}>
                  {todo.content}
                </h3>

                <ul className={"mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"}>
                  <li>{todo.createAt}</li>
                  <li>&middot;</li>
                  <li>{1} comments</li>
                  <li>&middot;</li>
                  <li>{4} shares</li>
                </ul>

                <a
                  href="#"
                  className={clsx(
                    "absolute inset-0 rounded-md",
                    "ring-blue-400/80 focus:z-10 focus:outline-none focus:ring-2"
                  )}
                />
              </li>
            )}
          </ul>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>

  </div>
}
