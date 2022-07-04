import {clsx} from "@/libs"
import {Popover, Transition} from "@headlessui/react"
import React, {FormEventHandler} from "react"
import {Icon} from "./Icons"

type Props = {
  name: string
  className?: string
  initial: string
  options: string[]
  current: string
  onChange: FormEventHandler<HTMLDivElement>
}

export const Filter = ({
                         name,
                         className = "",
                         initial,
                         options,
                         current,
                         onChange
                       }: Props) =>
  <Popover className={"relative"}>
    <Popover.Button>
      <div
        className={clsx("inline-flex justify-center items-center w-full rounded-lg ",
          "border border-grey-light px-4 py-1.5 bg-white text-sm leading-5",
          "text-gray-600 focus:outline-none", current != initial ? "text-violet-400" : "")}>
        {name}
        <Icon name={"chevron-down"} className={"size-5 -mr-1 ml-auto md:ml-2"}/>
      </div>
    </Popover.Button>

    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1">
      <Popover.Panel
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 z-10 w-28 pt-3 pb-1 mt-1 bg-white" +
          " rounded-lg border border-gray-200/80 shadow-2xl shadow-purple-50 sm:pl-2",
          className)}>
        <div className="px-2" onChange={onChange}>
          {options.map(d => <div key={d} className={"flex items-center pb-2"}>
              <input
                type="radio"
                readOnly
                name={name}
                id={d}
                value={d}
                checked={d === current}
                className={"styledRadio"}
              />
              <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
            </div>
          )}
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
