import {ChangeEvent, useRef} from "react"

export const useFile = (handler: (ev: ProgressEvent<FileReader>) => void) => {
    const ref = useRef<HTMLInputElement>(null)

    const openUpload = () => ref.current?.click()

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget?.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = async (ev: ProgressEvent<FileReader>) => handler(ev)

            reader.readAsBinaryString(file as Blob)
        }
    }

    return {ref, openUpload, handleFile}
}
