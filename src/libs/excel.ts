import {saveAs} from "file-saver"
import {read, utils, write, WritingOptions} from "xlsx"

const opts: WritingOptions = {bookType: "xlsx", bookSST: false, type: "array"}

export const import_data = <T = any>(ev: ProgressEvent<FileReader>) => {
    const data = ev.target?.result
    const workbook = read(data, {type: "binary"})
    const name = workbook.SheetNames[0]
    return utils.sheet_to_json<T>(workbook.Sheets[name])
}

export const export_data = <T>(data: T[], name: string) => {
    const wb = utils.book_new()
    const ws = utils.json_to_sheet(data)
    utils.book_append_sheet(wb, ws, name)
    const out = write(wb, opts)
    saveAs(new Blob([out], {type: "application/octet-stream"}), name)
}
