import {useNavigate} from "react-router-dom"

type Props = Person

export const PersonCard = ({name, password, email, role, tankCount, label, tags}: Props) => {
  const navigate = useNavigate()
  const toTanks = () => navigate(`/tanks/${name}`)

  return <div
    className={"flex flex-col space-y-1 w-64 h-40 px-3 py-2.5" +
      " bg-gray-50 rounded-lg shadow-lg cursor-pointer" +
      " transition-transform  duration-300 hover:-translate-y-1"}
    role={"button"}
    onClick={toTanks}
  >

    <h2 className={"text-xl font-medium"}>{name}</h2>
    <h4 className={"text-gray-500"}>{email}</h4>

    <div>鱼缸数量：{tankCount}</div>

    <div>权限级别: {role}</div>
    <div>密码: {password}</div>

    <div className={"self-start"}>{label}</div>

    <div className={"flex-center space-x-2"}>
      {tags?.map(d =>
        <span key={d} className={"px-2 py-0.5 bg-gray-200"}>
        {d}
      </span>)}
    </div>
  </div>
}
