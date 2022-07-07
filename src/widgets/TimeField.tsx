import {FieldInputProps} from "react-final-form"
import SimpleTimeField from "react-simple-timefield"

type Props = {
  input: FieldInputProps<any, HTMLInputElement>
}

export const TimeField = ({input}: Props) =>
  <SimpleTimeField
    value={input.value}
    onChange={input.onChange}
    input={<input
      className={"w-16 py-0.5 text-center text-gray-500 " +
        "font-medium rounded-md shadow-lg select-none focus:outline-none"}
    />}
  />
