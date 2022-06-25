import {atom} from "recoil"

export enum ModalEnum {
    DEFAULT_CLOSED,
    SignUp,
    TankAdd,
    TankModify,
    TankDelete,
    ALERT
}


export type ModalStore = {
    type: ModalEnum
    param?: any
}

export const defaultModalStore = {type: ModalEnum.DEFAULT_CLOSED, param: null}

export const modalAtom = atom<ModalStore>({
    key: "modal",
    default: defaultModalStore,
})
