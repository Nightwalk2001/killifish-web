import {FieldInputProps} from "react-final-form"
import {DatePicker} from "./DatePicker"
import {diffTime} from "@/libs"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
}

export const DateField = ({input}: Props) => <div className={"flex items-center space-x-4"}>
  <DatePicker date={input.value} handleSelect={input.onChange}/>
  <div>age: {diffTime(input.value)}</div>
</div>
