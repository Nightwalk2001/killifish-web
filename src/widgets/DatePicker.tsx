import {DayPicker} from "react-day-picker"
import {Icon} from "./Icons"
import {Fragment, useRef, useState} from "react"
import {lightFormat} from "date-fns"
import {useClickOutside} from "@/hooks"
import {Transition} from "@headlessui/react"

type Props = {
  date?: Date
  handleSelect: (date: Date) => void
}

export const DatePicker = ({date, handleSelect}: Props) => {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  const selectDate = (date?: Date) => {
    if (date) handleSelect(date)
    setShow(!show)
  }

  useClickOutside(ref, () => setShow(false))

  return <div ref={ref} className={"relative w-fit"}>
    <input
      readOnly
      role={"button"}
      className={"w-48 py-1.5 pl-3 text-gray-500 font-medium rounded-md shadow-lg select-none focus:outline-none"}
      value={date ? lightFormat(date, "yyyy-MM-dd") : "select date"}
      onClick={() => setShow(!show)}
    />
    <Icon
      name={"calender"}
      className={"absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 p-1 rounded-md opacity-75 text-indigo-500"}/>

    <Transition
      as={Fragment}
      show={show}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div
        className={"absolute -left-[72px] top-10 z-50 bg-white rounded-lg shadow-lg"}>
        <DayPicker
          mode={"single"}
          selected={date}
          onSelect={selectDate}
        />
      </div>
    </Transition>
  </div>
}