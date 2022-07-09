import {clsx, diffTime} from "@/libs"
import {Icon, Null, tdStyle, thStyle} from "@/widgets"
import React from "react"

type Props = {
  recording: Recording
}

export const Thead = () => <div className={"table-header-group text-center"}>
  <div className={"table-row bg-gray-200/70"}>
    <div className={clsx(thStyle, "w-1/8")}>
      <div role={"button"} className={"flex items-center w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        <span className={"ml-0.5 mr-1"}>owner</span>
        {/*<Icon name={"alpha-sort"} className={"size-4"}/>*/}
      </div>
    </div>
    <div role={"button"} className={clsx(thStyle, "w-1/10")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        <span>genotype</span>
        {/*<Icon name={"numeric-sort"} className={"size-4"}/>*/}
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        <span>age</span>
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-3/8")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        quantity
        <Icon name={"numeric-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        trigger
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        time
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div role={"button"} className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        time
      </div>
    </div>
  </div>
</div>

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
    className={tdStyle}>{diffTime(birthday) ?? <Null/>}</div>
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