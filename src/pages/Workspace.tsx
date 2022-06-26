import {ModalEnum} from "@/stores"
import {Icon, Modal, PersonCard} from "@/widgets"
import {useState} from "react"

export const Workspace = () => {
  const [persons, setPersons] = useState<Person[]>()

  return <div className={"px-10 pt-8"}>
    <button className={"flex items-center px-2.5 py-1.5 rounded-md text-white bg-indigo-300"}>
      <Icon name={"add"} className={"size-6"}/>
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
