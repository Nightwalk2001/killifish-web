import {RefObject, useEffect} from "react"

export const useClickOutside = <T extends Element = HTMLDivElement>(
    ref: RefObject<T>,
    fn: () => void) =>
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref?.current && !ref.current.contains(event.target as Node))
                fn()
        }

        document.addEventListener("click", handleClickOutside, true)

        return () => document.removeEventListener("click", handleClickOutside, true)
    }, [ref])
