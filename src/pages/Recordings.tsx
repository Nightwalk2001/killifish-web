import {updateTank, useFindOne, useInput, useModal, useRequest} from "@/hooks"
import {excludeUnset, getter, manuallyFeed} from "@/libs"
import {Filter, Modal, Pagination, Table, TankProfile, Tbody} from "@/widgets"
import {useEffect, useLayoutEffect, useState} from "react"
import {useParams, useSearchParams} from "react-router-dom"
import {RecordingRow, Thead} from "./recordings.table"
import {TankUpdateModal} from "./tanks.modal"
import {ModalEnum} from "@/stores"
import {toast} from "react-toastify"

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

  const {setModalStore, closeModal} = useModal()

  const {data: tank, mutate} = useFindOne(id, [id])

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

  useEffect(() => {
    let p = `page=${page}`
    if (trigger != DEFAULT) p += `&trigger=${trigger.toLowerCase()}`
    if (result != DEFAULT) p += `&result=${result.toLowerCase()}`
    if (pagesize != DEFAULT_PAGESIZE) p += `&pagesize=${pagesize}`
    setParams(p)
  }, [page, trigger, result, pagesize])

  const openUpdate = () => {
    setModalStore({type: ModalEnum.TankUpdate, param: tank})
  }

  const onFeed = () => setModalStore({type: ModalEnum.ManuallyFeed})

  const handleUpdate = async (values: any) => {
    console.log(values)
    const updateObject = excludeUnset(values)
    // if (updateObject.hasOwnProperty("feedTimes")) {
    //   console.log(updateObject["feedTimes"])
    // }

    console.log(updateObject)

    const d = {...tank, ...updateObject}

    await Promise.all([updateTank(d as Tank), mutate()])
    closeModal()
    toast("successfully updated!")
  }

  const confirmFeed = (quantity: number) => {
    manuallyFeed(id!, quantity)
  }

  return <div className={"w-11/12 mx-auto mt-8"}>
    {tank && <TankProfile tank={tank} handleEdit={openUpdate} handleFeed={onFeed}/>}

    <TankUpdateModal onSubmit={handleUpdate}/>

    <FeedModal closeModal={closeModal} afterConfirm={confirmFeed}/>

    <h2 className={"my-3 text-xl text-gray-600/90 font-semibold"}>Feeding Recordings</h2>
    <div className={"flex space-x-8 my-5"}>
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
      <Thead/>
      <Tbody>
        {data && data.recordings.map(d => <RecordingRow key={d.time} recording={d}/>)}
      </Tbody>
    </Table>

    {data && <Pagination total={data.count} pagesize={+pagesize} current={page} onPageChange={setPage}/>}

  </div>
}

type Props = {
  closeModal: () => void
  afterConfirm: (quantity: number) => void
}

const FeedModal = ({closeModal, afterConfirm}: Props) => {
  const [quantity, handleQuantity] = useInput("")

  const handleConfirm = () => {
    if (isNaN(+quantity) || !quantity) {
      toast("quantity should be integer!", {
        type: "error"
      })
      return
    }
    afterConfirm(+quantity)
    closeModal()
  }

  return <Modal name={ModalEnum.ManuallyFeed} className={"w-[300px] ring-1 ring-gray-200 shadow-lg"}
                title={"Manually Feed"}>
    <input
      type="text"
      placeholder={"feeding quantity"}
      className={"h-9 pl-2.5 pr-1.5 py-1 caret-gray-400 ring-1.1 ring-inset ring-gray-300 rounded-md transition-all focus:outline-none focus:ring-indigo-300"}
      onChange={handleQuantity}
    />

    <div className={"flex items-center space-x-4 mt-2"}>
      <button onClick={closeModal} className={"px-1 py-0.5 rounded-md text-rose-400 border border-rose-400"}>
        cancel
      </button>
      <button onClick={handleConfirm} className={"px-1 py-0.5 rounded-md text-cyan-300 border border-cyan-300"}>
        confirm
      </button>
    </div>
  </Modal>
}
