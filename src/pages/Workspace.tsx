import {useName, useRequest, useSearch} from "@/hooks"
import {getter, mainPart} from "@/libs"
import {PieChart, StreamChart} from "@/widgets"
import {sum} from "d3-array"
import {useNavigate} from "react-router-dom"
import {scaleOrdinal} from "d3-scale"

const color = scaleOrdinal<number, string>()
  .range([
    "rgb(87,215,236)",
    "rgb(62,238,211)",
    "rgb(236,119,199)",
    "rgb(236,55,97)",
    "rgba(255,211,12,0.88)",
    "rgba(126,10,241,0.5)",
    "rgba(229,53,255,0.9)"
  ])

export const Workspace = () => {
  const name = useName()

  const {data: todos, mutate} = useRequest<Todo[]>("/todos", getter)

  const {data, count, distribution} = useSearch(name, {facetsDistribution: ["amount", "genotype", "species"]}, [])

  const fishAmount = distribution &&
    sum(Object.entries(distribution["amount"]), d => +d[0] * d[1])

  const navigate = useNavigate()

  return <div
    className={"relative grid grid-cols-12 grid-rows-6 px-8 lg:px-12 pt-6 text-gray-500"}>
    <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3"}>
      {/*<h1 className={"text-2xl text-gray-800 font-medium"}>*/}
      {/*  Good afternoon, <span className={"font-semibold"}>{name}!</span>*/}
      {/*</h1>*/}

      <div className={"flex justify-between"}
           onClick={() => navigate(`/tanks/${name}`)}>
        <div className={"tracking-wider"}>
          <span className={"mr-2 text-4xl text-gray-700 font-medium"}>{count ?? 0}</span>
          tanks
        </div>

        <div className={"tracking-wider"}>
        <span className={"mr-2 text-4xl text-gray-700 font-medium"}>
          {fishAmount}
        </span>
          fishes
        </div>
      </div>

      <h2>
        <div
          className={"mr-3 text-3xl text-gray-700 font-medium"}>
          {distribution && mainPart(distribution["genotype"])}
        </div>
        <div>as main genotype</div>
      </h2>

      <h2>
        <div
          className={"mr-3 text-3xl text-gray-700 font-medium"}>
          {distribution && mainPart(distribution["species"])}
        </div>
        <div>
          as main species
        </div>
      </h2>
    </div>

    <div className={"col-start-1 col-span-4 row-start-1 row-span-5 px-6"}>
      <h2 className={"my-5 text-xl"}>Todo items</h2>
      <div className={"space-y-2 overflow-y-auto"}>
        {todos && todos.map((d, i) =>
          <div
            key={i}
            style={{backgroundColor: color(i)}}
            className={"pl-2.5 py-1.5 rounded-sm text-lg text-white opacity-85"}>
            {d.content}
          </div>)}
      </div>
    </div>

    <div className={"col-start-6 col-span-6 row-span-6"}>
      <StreamChart/>
    </div>

    <div className={"col-start-1 col-span-6 row-span-2"}>
      {distribution && <PieChart data={distribution["genotype"]}/>}
    </div>

    <div className={"col-start-9 col-span-3 row-span-2 text-right"}>
      {distribution && <PieChart data={distribution["species"]}/>}
    </div>

  </div>
}
