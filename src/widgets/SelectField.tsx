import {FieldInputProps} from "react-final-form"
import React from "react"
import {Select} from "./Select"

type Props = {
  input: FieldInputProps<any, HTMLSelectElement>
  // options: string[] | number[]
} & any

export const SelectField = ({
                              input,
                              // options,
                              ...rest
                            }: Props) => <>
  <Select
    current={input.value}
    onChange={input.onChange}
    className={"w-48"}
    {...rest}
  />
</>
