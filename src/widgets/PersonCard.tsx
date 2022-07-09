import {useNavigate} from "react-router-dom"

type Props = {
  person: Person
  count: number
}

const colors = {
  "normal": "#7ee5c0",
  "manager": "#a979e5"
}

export const PersonCard = ({person: {name, password, email, role, tankCount, label, tags}, count}: Props) => {
  const navigate = useNavigate()
  const toTanks = () => navigate(`/tanks/${name}`)

  return <div
    className={"flex flex-col space-y-1 w-64 h-40 px-3 py-2.5" +
      " bg-gray-50 rounded-lg shadow-lg cursor-pointer" +
      " transition-transform  duration-300 delay-50 hover:-translate-y-1"}
    role={"button"}
    onClick={toTanks}
  >

    <h2 className={"flex items-end space-x-4"}>
      <div className={"text-xl font-medium"}>
        {name}
      </div>
      <div
        className={"text-lg"}
        style={{color: colors[role]}}>
        {role}
      </div>
    </h2>

    <h4 className={"text-gray-500"}>{email}</h4>

    <div>count: {count}</div>

    <div className={"self-start"}>label: {label ?? "-"}</div>

    <div className={"flex-center space-x-2"}>
      {tags?.map(d =>
        <span key={d} className={"px-2 py-0.5 bg-gray-200"}>
        {d}
      </span>)}
    </div>
  </div>
}
