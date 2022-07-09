import {FieldInputProps, FieldMetaState} from "react-final-form"

type Props = {
  input: FieldInputProps<any, HTMLTextAreaElement>
  meta: FieldMetaState<any>
  className?: string
} & any

export const TextareaFiled = ({
                                input,
                                meta,
                                className = "",
                                ...rest
                              }: Props) => <textarea
  value={input.value}
  onChange={input.onChange}
  className={`w-full h-16 pl-2.5 pr-1.5 py-1 resize-none overflow-y-scroll rounded-md
     ring-1.1 ring-inset ring-gray-200 transition-all focus:outline-none focus:ring-indigo-300 ${rest.classname}`}
  {...rest}
/>