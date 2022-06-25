import {EyeIcon, EyeSlashIcon} from "@/widgets/Icons"
import {ChangeEventHandler, useState} from "react"

type Props = {
  password?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

const iconStyle = "absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer transition-color hover:text-gray-800"

export const Input = ({
  value,
  onChange,
  placeholder,
  password,
}: Props) => {
  const [inputType, setInputType] = useState<"text" | "password">("password")

  const hidePassword = () => setInputType("password"),
        showPassword = () => setInputType("text")

  const shouldShowIcon = password && value && value.length > 0,
        visible        = inputType === "text"

  const eyeIcon = visible
    ? <EyeSlashIcon className={iconStyle} role={"button"} onClick={hidePassword}/>
    : <EyeIcon className={iconStyle} role={"button"} onClick={showPassword}/>

  return <div className={"relative"}>
    <input
      type={password ?inputType: "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={"pl-4 pr-3 py-1.5 rounded-md bg-gray-100 ring-inset duration-100 " +
        "focus:outline-none focus:border-0 focus:ring-1.5 focus:ring-indigo-300 " +
        "focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:caret-gray-600"}
    />
    {
      shouldShowIcon && eyeIcon
    }
  </div>
}
