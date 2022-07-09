import {useFaceted, useRequest} from "@/hooks"
import {PersonCard} from "@/widgets"
import {getter} from "@/libs"

export const Management = () => {
  const {data: persons} = useRequest<Person[]>("/persons", getter)
  const {distribution} = useFaceted(["owner"], "", {}, [])

  return <div className={"w-5/6 mx-auto my-5"}>
    <div className={"grid grid-cols-4 gap-y-4"}>
      {persons && distribution && persons.map(p => <PersonCard
        key={p.name}
        person={p}
        count={distribution["owner"][p.name]}
      />)}
    </div>
  </div>
}
