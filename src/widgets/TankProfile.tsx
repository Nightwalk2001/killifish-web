import {updateTank} from "@/hooks"
import {Editable} from "@/widgets/Editable"
import {useState} from "react"

export const TankProfile = ({id, owner, sexual, genotype, species, size, amount, birthday, label}: Tank) => {
  const [g, setG] = useState(genotype ?? ""),
        [f,setF] = useState(sexual ?? "")

  const onG = async (n: string) => {
    setG(n)

    const res = await updateTank({id, owner, sexual, genotype: n, species, size, amount, birthday, label})

    console.log(res)
  }

  return <div className={"w-1/2"}>

    <div>
      <h2>Basic Info</h2>
    </div>

    <div>
      tank id: <span className={"font-semibold"}>{id}</span>
    </div>
    <div>
      owner: <span className={"font-semibold"}>{owner}</span>
    </div>
    <div>
      feed times: <span className={"px-1 py-0.5 text-white bg-purple-300 rounded-sm"}>8:28</span>
    </div>
    <div>
      genotype: <Editable onChange={onG} value={g}>{g}</Editable>
    </div>
    <div>
      sexual: <Editable value={f} onChange={setF}>{f}</Editable>
    </div>
    <div>
      species: <span className={"font-semibold"}>{species}</span>
    </div>
    <div>
      birthday: <span>{birthday}</span>
    </div>
    <div>
      size: <span className={"font-semibold"}>{size}</span>
    </div>
    <div>
      amount: <span className={"font-semibold"}>{amount}</span>
    </div>
    <div>
      label: <span className={"font-semibold"}>{label}</span>
    </div>

    <div>
      <h2>Additional Info</h2>
    </div>
  </div>
}
