import {atom} from "recoil"

const DEFAULT = undefined

export const profileAtom = atom<Profile>({
    key: "profile",
    default: DEFAULT
})
