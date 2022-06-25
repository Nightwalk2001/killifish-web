import {ModalEnum} from "@/stores"
import {Modal, PersonCard} from "@/widgets"
import {useState} from "react"

export const Workspace = () => {
  const [persons, setPersons] = useState<Person[]>()

  return <div className={"px-10 pt-8"}>
    <button className={"flex items-center px-2.5 py-1.5 rounded-md text-white bg-indigo-300"}>
      <svg viewBox="0 0 16 16" className={"fill-current w-6 h-6"}>
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      <span>添加鱼缸</span>
    </button>
    <div className={"grid grid-cols-3 lg:grid-cols-5 justify-items-center gap-y-4 my-4"}>
      {persons && persons.map(d =>
        <PersonCard key={d.name}{...d}/>,
      )}
    </div>

    <Modal name={ModalEnum.TankAdd}>
      <div>123</div>
    </Modal>

  </div>
}
