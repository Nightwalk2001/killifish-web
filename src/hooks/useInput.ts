import {ChangeEvent, useState} from "react"

export const useInput = (init: string) => {
    const [value, setValue] = useState<string>(init)

    const handleValue = (ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)

    return [value, handleValue, setValue] as const
}
