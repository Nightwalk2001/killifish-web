import {profileAtom, queryAtom} from "@/stores"
import {ChangeEvent} from "react"
import {useNavigate} from "react-router-dom"
import {useRecoilValue, useSetRecoilState} from "recoil"
import {Profile} from "./Profile"
import {Icon} from "@/widgets/Icons";

export const TopBar = () => {
  const navigate = useNavigate()

  const profile  = useRecoilValue(profileAtom),
        setQuery = useSetRecoilState(queryAtom)

  const goBack    = () => navigate(-1),
        goForward = () => navigate(1),
        refresh   = () => navigate(0)

  const handleQuery = (ev: ChangeEvent<HTMLInputElement>) =>setQuery(ev.target.value)

  return <div
    className={`${profile ? "visible" : "invisible"}
    sticky left-0 top-0 z-100 flex-center justify-between
     w-full pt-3 pb-2 pl-10 lg:pl-20 bg-white/30 backdrop-blur-md shadow`}>
    <div className={"flex-center space-x-1 font-medium text-gray-600 select-none"}>

      <button
        className={"px-2.5 py-0.5 rounded-sm hover:text-white hover:bg-cyan-400/80 cursor-pointer"}
        onClick={() => navigate("/")}>
        Home
      </button>
      <button
        className={"px-2.5 py-0.5 rounded-sm hover:text-white hover:bg-cyan-400/80 cursor-pointer"}
        onClick={() => navigate("/")}
      >
        Workspace
      </button>
      <button className={"px-2.5 py-0.5 rounded-sm hover:text-white hover:bg-cyan-400/80 cursor-pointer"}>Monitor
      </button>
      <button
        className={"px-2.5 py-0.5 rounded-sm hover:text-white hover:bg-cyan-400/80 cursor-pointer"}
        onClick={() => navigate("/routine")}>
        Routine
      </button>
      <button
        className={"px-2.5 py-0.5 rounded-sm hover:text-white hover:bg-cyan-400/80 cursor-pointer"}
        onClick={() => navigate("/todos")}>
        Todo
      </button>
    </div>

    <div className={"relative"}>
      <input
        placeholder={"id/owner/genotype/sexual"}
        className={`w-64 h-9 pl-9 pr-3 py-1 text-sm bg-gray-100 rounded-md outline-none ring-inset select-none
    transition-color duration-150 focus:text-gray-600 focus:bg-white focus:ring-1 focus:ring-gray-300`}
        onChange={handleQuery}
      />
      <Icon name={"search"} className={"absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 stroke-current opacity-30"}/>
    </div>

    <div className={"flex-center space-x-1"}>
      <button className={"p-1.5 rounded-md cursor-pointer text-gray-500 hover:text-gray-600 hover:bg-[#ededed]"}>
        <Icon name={"notify"} className={"size-6"}/>
      </button>

      <button className={"p-2 rounded-md cursor-pointer text-gray-500 hover:text-gray-600 hover:bg-[#ededed]"}>
        <Icon name={"setting"} className={"size-5"}/>
      </button>

      <Profile/>
    </div>
  </div>
}
