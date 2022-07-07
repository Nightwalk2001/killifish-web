import {useName, useRequest, useSearch} from "@/hooks"
import {getter, mainPart} from "@/libs"
import {PieChart, StreamChart} from "@/widgets"
import {sum} from "d3-array"
import {useNavigate} from "react-router-dom"

export const Homepage = () => {
  const name = useName()

  const {data: todos, mutate} = useRequest<Todo[]>("/todos", getter)

  const {data, count, distribution} = useSearch(name, {facetsDistribution: ["amount", "genotype", "species"]}, [])

  const fishAmount = distribution && sum(Object.entries(distribution["amount"]), d => +d[0] * d[1])

  const navigate = useNavigate()

  return <div className={"flex justify-between px-8 lg:px-12 py-6 text-gray-600"}>
    <div className={"w-2/5"}>

      <h1 className={"text-2xl text-gray-800 font-medium"}>
        Good afternoon, <span className={"font-semibold"}>LMJ!</span>
      </h1>

      <h2 role={"button"} className={"text-xl text-gray-600 font-medium"} onClick={() => navigate(`/tanks/${name}`)}>
        total tank amount: <span className={"font-semibold"}>{count ?? ""}</span>
      </h2>

      <button>
        see monitor analysis
      </button>

      <h2 className={"text-xl"}>Todo List</h2>
      <div>
        {todos && todos.map(d => <div key={d._id}>
          {d.content}
        </div>)}
      </div>
    </div>
    <div className={"w-3/5"}>

      <StreamChart/>

      <h2>total fishes: {fishAmount}</h2>
      <h2>main genotype: <span
        className={"uppercase text-gray-700 font-medium"}>
        {distribution && mainPart(distribution["genotype"])}
      </span>
      </h2>
      {
        count && distribution && <div className={"flex justify-between"}>
            <PieChart data={distribution["genotype"]}/>
            <PieChart data={distribution["species"]}/>
        </div>
      }

    </div>
  </div>
}
