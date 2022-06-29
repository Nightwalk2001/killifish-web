import {FieldInputProps, FieldMetaState} from "react-final-form"
import React from "react"
import {clsx} from "@/libs"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
  meta: FieldMetaState<any>
  className?: string
}

export const InputField = ({
                             input,
                             meta,
                             className = ""
                           }: Props) => <>
  <input
    type="text"
    value={input.value}
    onChange={input.onChange}
    className={clsx("w-48 h-9 pl-2.5 pr-1.5 py-1 ring-1.1 ring-inset ring-gray-300 rounded-md " +
      "focus:outline-none focus:ring-indigo-300", className)}/>
  {meta.error && meta.touched && <span>{meta.error}</span>}
</>