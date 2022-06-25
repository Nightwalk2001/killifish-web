import {profileAtom, queryAtom} from "@/stores"
import {ChangeEvent} from "react"
import {useNavigate} from "react-router-dom"
import {useRecoilValue, useSetRecoilState} from "recoil"
import {Profile} from "./Profile"

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
      <svg viewBox={"0 0 32 32"}
           className={"absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 stroke-current opacity-30"}>
        <path
          d={"M30.707,29.293l-6.846-6.846a13.039,13.039,0,1,0-1.414,1.414l6.846,6.846a1,1,0,0,0,1.414-1.414ZM3,14A11,11,0,1,1,14,25,11.013,11.013,0,0,1,3,14Z"}/>
      </svg>

    </div>

    <div className={"flex-center space-x-1"}>
      <button className={"p-1.5 rounded-md cursor-pointer text-gray-500 hover:text-gray-600 hover:bg-[#ededed]"}>
        <svg viewBox="0 0 512 512" className={"w-6 h-6 fill-current stroke-current"}>
          <path
            d="M289.7 403c-6.1 0-11.4 4.2-12.7 10.2-1 4.5-2.7 8.2-5 10.9-1.3 1.5-5.1 5.9-16.1 5.9-11 0-14.8-4.5-16.1-5.9-2.3-2.7-4-6.4-5-10.9-1.3-6-6.6-10.2-12.7-10.2-8.4 0-14.5 7.8-12.7 15.9 5 22.3 21 37.1 46.5 37.1s41.5-14.7 46.5-37.1c1.8-8.1-4.4-15.9-12.7-15.9zM412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.3-10.8-24.6-24-24.6h-.6c-13.2 0-24 11.3-24 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.1 0 25.4-18.8 15.6-31.8zm-39 5.8H139.8c-3.8 0-5.8-4.4-3.3-7.3 7-8 14.7-18.5 21-33.4 9.6-22.6 14.3-51.5 14.3-88.2 0-37.3 7-66.5 20.9-86.8 12.4-18.2 27.9-25.1 38.7-27.6 8.4-2 14.4-5.8 18.6-10.5 3.2-3.6 8.7-3.8 11.9-.2 5.1 5.7 12 9.1 18.8 10.7 10.8 2.5 26.3 9.4 38.7 27.6 13.9 20.3 20.9 49.5 20.9 86.8 0 36.7 4.7 65.6 14.3 88.2 6.5 15.2 14.4 25.9 21.5 33.9 2.2 2.7.4 6.8-3.1 6.8z"/>
        </svg>
      </button>

      <button className={"p-2 rounded-md cursor-pointer text-gray-500 hover:text-gray-600 hover:bg-[#ededed]"}>
        <svg viewBox="0 0 512 512" className={"w-5 h-5 fill-current stroke-current"}>
          <path fill="none" strokeWidth="32"
                d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"/>
        </svg>
      </button>

      <Profile/>
    </div>
  </div>
}
