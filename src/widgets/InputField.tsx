import {FieldInputProps, FieldMetaState} from "react-final-form"
import React from "react"
import {clsx} from "@/libs"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
  meta: FieldMetaState<any>
  className?: string
} & any

export const InputField = ({
                             input,
                             meta,
                             className = "",
                             ...rest
                           }: Props) => <input
  type="text"
  value={
    rest.upper
      ? input.value.toUpperCase()
      : input.value
  }
  readOnly={rest.readOnly}
  onChange={input.onChange}
  className={clsx("w-48 h-9 pl-2.5 pr-1.5 py-1 ring-1.1 ring-inset ring-gray-300 rounded-md " +
    "focus:outline-none focus:ring-indigo-300", className)}/>
