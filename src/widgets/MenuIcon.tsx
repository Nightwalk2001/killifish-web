import {ButtonHTMLAttributes} from "react"

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">

export const MenuIcon = (props: Props) => <button
  className={"p-1.5 rounded-md cursor-pointer text-gray-500 hover:text-gray-600 hover:bg-[#ededed]"} {...props}>
  <svg className={"w-6 h-6 fill-current"}
       viewBox="0 0 16 16">
    {props.children}
  </svg>
</button>
