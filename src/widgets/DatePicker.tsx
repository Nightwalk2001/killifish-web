import {range} from "d3-array"
import React, {useState} from "react"

const weekdays   = ["一", "二", "三", "四", "五", "六", "七"],
      months     = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      dayOfMonth = []

const today        = new Date(),
      currentYear  = today.getFullYear(),
      currentMonth = today.getMonth()

export const DatePicker = () => {
  const [showPicker, setShowPicker] = useState<boolean>(false),
        [month, setMonth]           = useState(currentMonth),
        [current, setCurrent]       = useState<Date>(today)

  const onToggleShow  = () => setShowPicker(!showPicker),
        currenWeekDay = (date: Date, weekday: number) => date.getDay() === weekday,
        formatDate    = (date: Date) => `${date.getFullYear()}年-${date.getMonth() + 1}月-${date.getDay()}日`
  // setDate = (day:number) =>

  return <div className={"relative w-72"}>
    <div onClick={onToggleShow} className={"relative"}>
      <input
        type={"text"}
        readOnly
        value={formatDate(current)}
        className={"w-48 pl-8 py-2 bg-gray-50 text-gray-600 font-medium focus:outline-none focus:shadow-outline"}
        placeholder={"选择日期"}
      />
    </div>
    <div className={"absolute inset-y-0 mt-10 w-96"}>
      <div className={"flex-middle mb-2"}>
        <svg viewBox={"0,0,2,4"} className={"w-4 h-4 fill-gray-600"}>
          <polyline points={"2,0 0,2 2,4"}/>
        </svg>
        <span>{month}月</span>
        <svg viewBox={"0,0,2,4"} className={"w-4 h-4 fill-gray-600"}>
          <polyline points={"2,0 0,2 2,4"}/>
        </svg>
      </div>
      <div className={"flex-middle justify-between"}>
        {weekdays.map((d, i) =>
          <span
            key={d}
            className={`text-gray-400 ${current && currenWeekDay(current, i) && "bg-gray-200 p-2 rounded-md"}`}>{d}</span>)}
      </div>
      <div>
        {range(1, 31).map((d, i) => {
          const tmp = new Date(currentYear, currentMonth, 1)
          const tmpWeekday = tmp.getDay()

          return <div className={""}
          >

          </div>
        })}
      </div>
    </div>
  </div>
}
