import {useModal} from "@/hooks"
import {ModalEnum} from "@/stores"
import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment} from "react"
import {TrickCenter} from "./TrickCenter"

type Props = {
  name: ModalEnum
  title?: string
  children: React.ReactNode
  className?: string
}

export const Modal = ({
  name,
  title,
  children,
  className,
}: Props) => {
  const {type, closeModal} = useModal()

  return <Transition show={type === name} as={Fragment}>
    <Dialog
      as="div"
      className={"overflow-y-auto fixed inset-0 z-50"}
      onClose={closeModal}
    >
      <div className={"px-4 min-h-screen text-center"}>

        <Dialog.Overlay className={"fixed inset-0"}/>

        <TrickCenter/>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-250"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={`inline-block p-6 my-8 overflow-hidden text-left
            align-middle transition-all transform bg-white shadow-xl rounded-2xl ${className}`}>
            <div className={"flex flex-col items-center"}>
              {title &&
                <Dialog.Title
                  as="h3"
                  className={"text-lg font-medium leading-6 text-gray-900 mb-3"}
                >
                  {title}
                </Dialog.Title>}
              {children}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
}


type AlertModalProps = {
  message: string
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
}

export const AlertModal = ({
  message,
  onConfirm,
}: AlertModalProps) => {
  const {closeModal} = useModal()

  return <Modal
    name={ModalEnum.ALERT}
    className={"max-w-xs space-y-4"}>
    <div className={"text-gray-500"}>{message}</div>
    <div className={"space-x-6"}>
      <button onClick={closeModal} className={"px-3 py-1.5 text-gray-600 bg-gray-50 rounded-md"}>取消</button>
      <button onClick={onConfirm} className={"px-3 py-1.5 text-white bg-rose-500 rounded-md"}>确认</button>
    </div>
  </Modal>
}
