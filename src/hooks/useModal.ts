import {defaultModalStore, modalAtom, ModalEnum, ModalStore} from "@/stores"
import {SetterOrUpdater, useRecoilState} from "recoil"

type ModalHookType<T> = {
    type: ModalEnum,
    param: T,
    setModalStore: SetterOrUpdater<ModalStore>,
    closeModal: () => void
}

export const useModal = <T = any>() => {
    const [{type, param}, setModalStore] = useRecoilState(modalAtom)

    const closeModal = () => setModalStore(defaultModalStore)

    return {
        type,
        param,
        setModalStore,
        closeModal
    } as ModalHookType<T>
}
