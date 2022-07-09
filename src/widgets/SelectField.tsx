import {FieldInputProps} from "react-final-form"
import React from "react"
import {Select} from "./Select"

type Props = {
  input: FieldInputProps<any, HTMLSelectElement>
} & any

export const SelectField = ({
                              input,
                              ...rest
                            }: Props) => <>
  <Select
    current={input.value}
    onChange={input.onChange}
    className={"w-48"}
    {...rest}
  />
</>
