import {SVGProps} from "react"

type Props = {
    name: string
} & SVGProps<SVGSVGElement>

export const Icon = ({name, ...props}: Props) =>
    <svg {...props} aria-hidden="true">
        <use href={`#icon-${name}`}/>
    </svg>
