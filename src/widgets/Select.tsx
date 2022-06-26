import {Listbox, Transition} from "@headlessui/react"
import React, {Fragment} from "react"
import {Icon} from "./Icons"

type Props = {
  options: string[] | number[]
  current: string | number
  onChange: (p: any) => void
  className?: string
}

export const Select = ({
  options,
  current,
  onChange,
  className
}: Props) => {
  return <div className={className}>
    <Listbox value={current} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full py-2 pl-3 pr-2 text-left bg-gray-50 rounded-lg shadow-md focus:outline-none sm:text-sm">
          <span className="block truncate">{current}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Icon name={"selector"} className="w-5 h-5 text-gray-400"/>
            </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-10000 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((d, i) => (
              <Listbox.Option
                key={d}
                className={({active}) =>
                  `select-none relative py-2 pl-10 pr-4
                    ${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                    `}
                value={d}
              >
                {({selected}) => (
                  <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {d}
                      </span>
                    {selected &&
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 hover:text-white">
                         <Icon name={"check"} className={"w-5 h-5"}/>
                        </span>}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
}
