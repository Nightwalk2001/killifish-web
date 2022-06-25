import {defaultModalStore, modalAtom} from "@/stores"
import {useRecoilState} from "recoil"

export const useModal = () => {
    const [{type, param}, setModalStore] = useRecoilState(modalAtom)

    const closeModal = () => setModalStore(defaultModalStore)

    return {type, param, setModalStore, closeModal}
}
