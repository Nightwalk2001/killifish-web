import {differenceInDays} from "date-fns"

export const diffTime = (date?: string | number) => {
    if (!date) return "unset"
    let time: number

    if (typeof date === "string") time = Date.parse(date)
    else time = date

    let year: number = 0
    let month: number = 0
    let day: number = 0
    let result: string = ""

    const now = new Date()
    const days = differenceInDays(now, time)
    if (days === 0) result = "today"
    else if (days < 30) result += `${days}d`

    else if (days < 365) {
        month = Math.floor(days / 30)
        day = days % 30
    } else {
        year = Math.floor(days / 365)
        let rest = days % 365

        month = Math.floor(rest / 30)
        day = rest % 30
    }

    if (year != 0) result += `${year}y`
    if (month != 0) result += `${month}m`
    if (day != 0) result += `${day}d`

    return result
}
