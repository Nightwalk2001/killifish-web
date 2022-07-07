import {useFindOne, useInput, useModal, useRequest} from "@/hooks"
import {getter} from "@/libs"
import {Filter, Pagination, Table, TankProfile, Tbody, Thead} from "@/widgets"
import {ChangeEvent, useLayoutEffect, useState} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import {RecordingRow} from "@/pages/recordings.table"
import {TankUpdateModal} from "@/pages/tanks.modal"
import {ModalEnum} from "@/stores"

const headers = [
  "owner",
  "genotype",
  "age",
  "quantity",
  "trigger",
  "time",
  "result"
]

type InputChangeEvent = ChangeEvent<HTMLInputElement>

type RecordingsWithCount = { recordings: Recording[], count: number }

const triggers  = ["ALL", "AUTO", "MANUAL"],
      results   = ["ALL", "SUCCESS", "FAIL"],
      dates     = ["ALL", "within 3 days"],
      pagesizes = ["10", "15", "20", "30", "50"],
      sorts     = ["None", "owner", "genotype", "age", "time"]

const DEFAULT          = "ALL",
      DEFAULT_PAGESIZE = "10",
      DEFAULT_SORT     = "None"

export const Recordings = () => {
  const {id}                = useParams(),
        [params, setParams] = useSearchParams()

  const {setModalStore} = useModal()

  const {data: tank} = useFindOne(id, [id])

  const [page, setPage] = useState<number>(1)

  const [trigger, handleTrigger]   = useInput(DEFAULT),
        [result, handleResult]     = useInput(DEFAULT),
        [date, handleDate]         = useInput(DEFAULT),
        [pagesize, handlePagesize] = useInput(DEFAULT_PAGESIZE),
        [sort, handleSort]         = useInput(DEFAULT_SORT)

  const {data} = useRequest<RecordingsWithCount>(`/recordings/${id}?${params}`, getter)

  useLayoutEffect(() => {
    if (data && data.count / +pagesize < page) setPage(1)
  }, [data, pagesize])

  useLayoutEffect(() => {
    let p = `page=${page}`
    if (trigger != DEFAULT) p += `&trigger=${trigger.toLowerCase()}`
    if (result != DEFAULT) p += `&result=${result.toLowerCase()}`
    if (pagesize != DEFAULT_PAGESIZE) p += `&pagesize=${pagesize}`
    setParams(p)
  }, [page, trigger, result, pagesize])

  const openUpdate = () => setModalStore({type: ModalEnum.TankUpdate, param: tank})

  const handleUpdate = (values: any) => {

  }

  return <div className={"w-11/12 mx-auto mt-8 mb-5 "}>
    {tank && <>
      <TankProfile tank={tank}/>
      <button onClick={openUpdate}>modify</button>
    </>}

    <TankUpdateModal onSubmit={handleUpdate}/>

    <div>
      operations: <button className={"px-3 py-2 text-white bg-sky-300 rounded-md"}>Manually Feed</button>
    </div>

    <h2>Feeding Info</h2>
    <div className={"flex space-x-8 my-3"}>
      <Filter
        name={"trigger"}
        initial={DEFAULT}
        options={triggers}
        current={trigger}
        onChange={handleTrigger}
      />

      <Filter
        name={"result"}
        initial={DEFAULT}
        options={results}
        current={result}
        onChange={handleResult}
      />

      <Filter
        name={"age"}
        initial={DEFAULT}
        className={"w-36"}
        options={dates}
        current={date}
        onChange={handleDate}
      />

      <Filter
        name={"page size"}
        className={"w-36"}
        initial={DEFAULT_PAGESIZE}
        options={pagesizes}
        current={pagesize}
        onChange={handlePagesize}
      />

      <Filter
        name={"sort by"}
        initial={DEFAULT_SORT}
        onChange={handleSort}
        options={sorts}
        current={sort}
      />
    </div>

    <Table>
      <Thead headers={headers}/>
      <Tbody>
        {data && data.recordings.map(d => <RecordingRow key={d.time} recording={d}/>)}
      </Tbody>
    </Table>

    {data && <Pagination total={data.count} pagesize={+pagesize} current={page} onPageChange={setPage}/>}

  </div>
}
