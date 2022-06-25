import {remove} from "@/libs"
import {profileAtom} from "@/stores"
import {Popover, Transition} from "@headlessui/react"
import {Fragment} from "react"
import {useNavigate} from "react-router-dom"
import {useRecoilState} from "recoil"

export const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useRecoilState(profileAtom)

  const handleLogout = async () => {
    await remove("profile")
    setProfile(undefined)
    navigate("/")
  }

  return <div className="px-4">
    <Popover className="relative">
      {({open}) => <>
        <Popover.Button
          className={`${open ? "" : "text-opacity-90"}
               p-1 rounded-md cursor-pointer hover:bg-[#ededed]`}
        >
          <img src={"/avatar.png"} alt={""} className={"w-7 h-7 rounded-full"}/>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className="absolute right-0 z-10 mt-3 w-screen max-w-2xs">
            <div
              className={"flex flex-col py-1 lg:py-2" +
                " bg-white rounded-lg shadow-lg divide-y" +
                " ring-1 ring-black ring-opacity-5"}>
              <div className={"flex flex-col items-start pl-6 py-3"}>
                <div className={"flex items-center space-x-3"}>
                  <img src={"/avatar.png"} alt={""} className={"w-12 h-12 rounded-full"}/>
                  <div className={"flex flex-col"}>
                    <h2 className={"text-lg text-gray-500"}>{profile?.name}</h2>
                    <h3 className={"text-[#5dd8c4]"}>role：{profile?.role}</h3>
                  </div>
                </div>

                <button className={"text-gray-500 mt-6 mb-1.5"}>My Tanks</button>

                <button className={"text-gray-500 my-1.5"}>My Messages</button>

                <button className={"text-gray-500 my-1.5"}>My Monitors</button>
              </div>

              <div className={"flex flex-col space-y-2 pl-6 py-3 text-gray-500"}>
                <div>
                  <button>Account Settings</button>
                </div>
                <div role={"button"} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>}
    </Popover>
  </div>
}
