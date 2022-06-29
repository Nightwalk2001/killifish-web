import React from "react"

type Props = {
  children: React.ReactNode
  bg?: string
}

export const Badge = ({children, bg = "#d8b4fe"}: Props) => <div
  style={{backgroundColor: bg}}
  className={"inline-flex items-center w-fit pl-1 py-0.5 rounded-sm text-white"}>
  {children}
</div>
