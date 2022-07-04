import {clsx, diffTime} from "@/libs"
import {Icon, tdStyle, thStyle} from "@/widgets"
import React from "react"
import {scaleOrdinal} from "d3-scale"
import {Link} from "react-router-dom"

export const Thead = () => <div className={"table-header-group text-center"}>
  <div className={"table-row bg-gray-200/70"}>
    <div className={clsx(thStyle, "w-1/8")}>
      <div role={"button"} className={"flex items-center w-fit mx-auto"}>
        <Icon name={"primary-key"} className={"size-4 text-[#80cbc4]"}/>
        <span className={"ml-0.5 mr-1"}>tank id</span>
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div role={"button"} className={clsx(thStyle, "w-1/10")}>
      <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        <span>size</span>
        <Icon name={"numeric-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        <span>amount</span>
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-3/8")}>
      <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        genotype
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        sexual
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
        <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
        age
        <Icon name={"alpha-sort"} className={"size-4"}/>
      </div>
    </div>
    <div className={clsx(thStyle, "w-1/10")}>
      operations
    </div>
  </div>
</div>

type Props = {
  tank: Tank
  handleSelect: (id: string) => void
  checked: boolean
  handleEdit: (id: string) => void
}

const color = scaleOrdinal<number, string>()
  .domain([1.5, 3, 10])
  .range(["#f899d7", "#a0b9f1", "#d3a9fd"])

export const TankRow = ({
                          tank: {id, amount, genotype, sexual, size, birthday},
                          handleSelect,
                          checked,
                          handleEdit
                        }: Props) =>
  <div className={"table-row whitespace-nowrap text-gray-700 odd:bg-gray-50/50"}>
    <div className={clsx(tdStyle, "inline-flex place-content-center py-2")}>
      <input
        type="checkbox"
        checked={checked}
        className={"justify-self-center w-5 h-5 rounded-sm border-1.5"}
        onChange={() => handleSelect(id)}
      />
      <span className={"inline-block w-16"}>{id}</span>
    </div>
    <div
      className={clsx(tdStyle, "font-medium")}
      style={{color: color(size)}}>
      {size}L
    </div>
    <div className={tdStyle}>{amount}</div>
    <div className={clsx(tdStyle, "truncate")}>{genotype}</div>
    <div className={tdStyle}>{sexual ??
      <div className={"text-gray-400/50 italic"}>&lt;null&gt;</div>}</div>

    <div className={tdStyle}>{diffTime(birthday)}</div>
    <div className={tdStyle}>
      <div className={"flex justify-around items-center"}>
        <Link to={`/recordings/${id}`}>
          <button
            className={"inline-flex items-center px-1 text-sm text-cyan-300" +
              " border border-cyan-300 rounded-sm"}>
            more
            <Icon name={"more"} className={"w-3.5 h-3.5"}/>
          </button>
        </Link>
        <button
          className={"inline-flex items-center px-1 text-sm text-indigo-400 border border-indigo-400 rounded-sm"}
          onClick={() => handleEdit(id)}
        >
          edit
          <Icon name={"edit"} className={"w-3.5 h-3.5"}/>
        </button>
      </div>
    </div>
  </div>