import {useModal} from "@/hooks"
import {ModalEnum} from "@/stores"
import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment} from "react"
import {TrickCenter} from "./TrickCenter"
import {clsx} from "@/libs"

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
                        className = "",
                      }: Props) => {
  const {type, closeModal} = useModal()

  return <Transition show={type === name} as={Fragment}>
    <Dialog
      as="div"
      className={"overlay fixed inset-0 z-50 px-4 text-center"}
      onClose={closeModal}
    >
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
          className={clsx("inline-block p-6 my-8 text-left" +
            " align-middle transition-all transform bg-white shadow-xl rounded-2xl", className)}>
          <>
            {title &&
              <Dialog.Title as="h3"
                            className={"text-lg font-medium leading-6 text-gray-900 mb-3"}
              >
                {title}
              </Dialog.Title>}
            {children}
          </>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition>
}


type AlertModalProps = {
  message: (p: any) => React.ReactNode
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
}

export const AlertModal = ({
                             message,
                             onConfirm,
                           }: AlertModalProps) => {
  const {closeModal, param} = useModal()

  return <Modal
    name={ModalEnum.ALERT}
    className={"max-w-xs space-y-4"}>
    <div className={"text-gray-500"}>{message(param)}</div>
    <div className={"space-x-6"}>
      <button onClick={closeModal} className={"px-3 py-1.5 text-gray-600 bg-gray-50 rounded-md"}>取消</button>
      <button onClick={onConfirm} className={"px-3 py-1.5 text-white bg-rose-500 rounded-md"}>确认</button>
    </div>
  </Modal>
}
