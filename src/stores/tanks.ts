import {atom} from "recoil"

export const selectedTanksAtom = atom<string[]>({
    key: "selected-tanks",
    default: []
})

export const feedTimesAtom = atom<string[]>({
    key: "feed-times",
    default: []
})