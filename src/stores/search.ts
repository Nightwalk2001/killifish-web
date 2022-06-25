import {atom} from "recoil"

export const queryAtom = atom<string>({
    key: "query",
    default: ""
})
