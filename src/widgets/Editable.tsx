import {motion} from "framer-motion"
import React, {ChangeEvent, useState} from "react"

type Props = {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

export const Editable = ({value, onChange, children}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const openEditing  = () => setIsEditing(true),
        closeEditing = () => setIsEditing(false)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)

  return <motion.div layout className={"flex items-center space-x-2"}>
    {isEditing
      ? <motion.div layout className={"flex items-center space-x-2"}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={"w-48 pl-2.5 pr-1.5 py-1 ring-inset rounded-sm focus:outline-none focus:ring-1 focus:ring-indigo-300"}
        />
        <button onClick={closeEditing}>

          <svg viewBox="0 0 512 512" className={"w-5 h-5 text-purple-400"}>
            <path
              d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z"
              fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          </svg>
        </button>
      </motion.div>
      : <motion.div layout role={"button"} onClick={openEditing} className={"flex items-center py-1"}>
        <span className={"text-gray-600"}>{children}</span>
        <svg viewBox="0 0 24 24" className={"w-6 stroke-0 fill-blue-300"}>
          <path
            d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"/>
        </svg>
      </motion.div>}
  </motion.div>
}
