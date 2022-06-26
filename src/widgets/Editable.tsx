import {motion} from "framer-motion"
import React, {ChangeEvent, useState} from "react"
import {Icon} from "@/widgets/Icons";

type Props = {
    value: string
    onChange: (value: string) => void
    children: React.ReactNode
}

export const Editable = ({value, onChange, children}: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const openEditing = () => setIsEditing(true),
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
                    <Icon name={"save"} className={"size-5 text-purple-400"}/>
                </button>
            </motion.div>
            : <motion.div layout role={"button"} onClick={openEditing} className={"flex items-center py-1"}>
                <span className={"text-gray-600"}>{children}</span>
                <Icon name={"edit"} className={"size-6 stroke-0 fill-blue-300"}/>
            </motion.div>}
    </motion.div>
}
