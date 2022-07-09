import {diffTime} from "@/libs"
import {scaleOrdinal} from "d3-scale"

type Props = {
  tank: Tank
  handleEdit: () => void
  handleFeed: () => void
}

const color = scaleOrdinal<number, string>().range([
  "rgb(87,215,236)",
  "rgb(62,238,211)",
  "rgb(236,119,199)",
  "rgb(255,124,155)",
  "rgba(255,211,12,0.88)",
  "rgba(126,10,241,0.5)",
  "rgba(229,53,255,0.9)"
])

export const TankProfile = ({
                              tank: {
                                id,
                                owner,
                                sexual,
                                genotype,
                                species,
                                size,
                                amount,
                                birthday,
                                feedTimes,
                                label
                              },
                              handleEdit,
                              handleFeed
                            }: Props) =>
  <div
    className={"my-5 px-10 divide-y divide-slate-200 text-gray-700/90 text-lg border border-slate-200/80 rounded-md shadow-lg"}>

    <div className={"grid grid-cols-8 py-4 divide-x divide-slate-200"}>
      <div className={"col-span-4 pr-10"}>
        <div className={"flex items-center justify-between"}>
          <h2 className={"my-3 text-xl text-gray-600/90 font-semibold"}>Basic Info</h2>
          <button className={"text-cyan-300"} onClick={handleEdit}>edit</button>
        </div>

        <div className={"flex items-center space-x-6"}>
          <ul>
            <li>tank id</li>
            <li>owner</li>
            <li>size</li>
            <li>amount</li>
          </ul>

          <ul className={"text-gray-700/90"}>
            <li>{id}</li>
            <li>{owner}</li>
            <li>{size}</li>
            <li>{amount}</li>
          </ul>
        </div>
      </div>

      <div className={"col-span-4 px-10"}>
        <h2 className={"my-3 text-xl text-gray-600/90 font-semibold"}>Additional Info</h2>
        <div className={"col-span-5 flex items-center space-x-6"}>
          <ul>
            <li>genotype</li>
            <li>sexual</li>
            <li>species</li>
            <li>age</li>
          </ul>

          <ul className={"text-gray-700/90"}>
            <li>{genotype ? genotype : "-"}</li>
            <li>{sexual ? sexual : "-"}</li>
            <li>{species ? species : "-"}</li>
            <li>{birthday ? diffTime(birthday) : "-"}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className={"grid grid-cols-8 h-48 py-4 divide-x divide-slate-200"}>

      <div className={"col-span-4 pr-10"}>
        <div className={"flex items-center justify-between"}>
          <h2 className={"my-3 text-xl text-gray-600/90 font-semibold"}>Feeding Info</h2>
          <button className={"text-indigo-300"} onClick={handleFeed}>manually feed</button>
        </div>

        <div className={"grid grid-cols-8 gap-x-4 gap-y-2"}>
          {feedTimes?.length
            ? feedTimes?.map((d, i) =>
              <span
                key={d}
                style={{backgroundColor: color(i)}}
                className={"px-1.5 py-0.5 rounded-md text-white"}
              >
                {d}
              </span>)
            : "-"
          }
        </div>
      </div>

      <div className={"col-span-4 px-10"}>
        <h2 className={"my-3 text-xl text-gray-600/90 font-semibold"}>label</h2>
        <div>
          {label ?? "-"}
        </div>
      </div>
    </div>
  </div>