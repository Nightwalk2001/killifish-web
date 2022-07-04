import {clsx, diffTime} from "@/libs"
import {Icon, tdStyle} from "@/widgets"

type Props = {
  recording: Recording
}

export const RecordingRow = ({
                               recording: {
                                 owner,
                                 genotype,
                                 birthday,
                                 sexual,
                                 succeed,
                                 quantity,
                                 trigger,
                                 time
                               }
                             }: Props) => <div
  className={"table-row text-center text-gray-700"}>
  <div className={clsx(tdStyle, "py-2.5")}>{owner}</div>
  <div className={clsx(tdStyle, "max-w-8")}>{genotype}</div>
  <div
    className={tdStyle}>{diffTime(birthday)}</div>
  <div className={tdStyle}>{quantity}</div>
  <div
    style={{
      color: trigger === "AUTO" ? "#dcb7f5" : "#7dfcf7"
    }}
    className={clsx(tdStyle, "py-2.5 font-medium")}>
    {trigger}
  </div>

  <div className={clsx(tdStyle, "whitespace-nowrap")}>{time}</div>

  {succeed ? success : fail}
</div>

const success = <div className={tdStyle}>
  <Icon name={"success"} className={"w-7 h-7 scale-95 mx-auto text-green-500/80"}/>
</div>

const fail = <div className={tdStyle}>
  <Icon name={"fail"} className={"w-7 h-7 mx-auto fill-red-500/80"}/>
</div>