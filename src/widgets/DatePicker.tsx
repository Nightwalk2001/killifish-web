import {DayPicker} from "react-day-picker"
import {Icon} from "./Icons"
import {motion} from "framer-motion"
import {useRef, useState} from "react"
import {lightFormat} from "date-fns"

type Props = {
  date?: Date
  handleSelect: (date: Date) => void
}

export const DatePicker = ({date, handleSelect}: Props) => {
  const [showPicker, setShowPicker] = useState(false)
  const ref = useRef(null)

  const selectDate = (date?: Date) => {
    if (date) handleSelect(date)
    setShowPicker(!showPicker)
  }

  return <div ref={ref} className={"relative w-fit"}>
    <input
      readOnly
      role={"button"}
      className={"w-48 py-1.5 pl-3 text-gray-500 font-medium rounded-md shadow-lg select-none focus:outline-none"}
      value={date ? lightFormat(date, "yyyy-MM-dd") : "select date"}
      onClick={() => setShowPicker(!showPicker)}
    />
    <Icon
      name={"calender"}
      className={"absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 p-1 rounded-md opacity-75 text-indigo-500"}/>

    <motion.div
      layout
      className={"absolute -left-[72px] top-10 z-50 bg-white rounded-lg shadow-lg"}>
      {showPicker && <DayPicker
        mode={"single"}
        selected={date}
        onSelect={selectDate}
      />}
    </motion.div>
  </div>
}