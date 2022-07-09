import {FieldInputProps} from "react-final-form"
import React from "react"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
} & any

export const InputField = ({input, ...rest}: Props) => <input
  type="text"
  value={
    rest.upper
      ? input.value.toUpperCase()
      : input.value
  }
  readOnly={rest.readOnly}
  onChange={input.onChange}
  className={`h-9 pl-2.5 pr-1.5 py-1 ring-1.1 ring-inset ring-gray-300 rounded-md transition-all focus:outline-none focus:ring-indigo-300 ${rest.className}`}

/>
