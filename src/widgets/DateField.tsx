import {FieldInputProps} from "react-final-form"
import {DatePicker} from "./DatePicker"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
}

export const DateField = ({input}: Props) => <DatePicker date={input.value} handleSelect={input.onChange}/>