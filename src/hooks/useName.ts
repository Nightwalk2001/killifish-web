import {profileAtom} from "@/stores"
import {useParams} from "react-router-dom"
import {useRecoilValue} from "recoil"

export const useName = () => {
    const {name} = useParams()
    const profile = useRecoilValue(profileAtom)

    return name ?? profile?.name ?? ""
}
