import {deleteTanks, updateTanks, useFile, useInput, useModal, useName, useSearch} from "@/hooks"
import {clsx, excludeUnset, export_data, import_data, meiliClient} from "@/libs"
import {ModalEnum, queryAtom, selectedTanksAtom} from "@/stores"
import {AlertModal, Filter, Icon, Pagination, Table, Tbody} from "@/widgets"
import React, {useState} from "react"
import {useRecoilState, useRecoilValue} from "recoil"
import {toast} from "react-toastify"
import {DEFAULT, DEFAULT_SORT, pagesizes, sexuals, sizes, sortMap, sorts} from "./tanks.constant"
import {TankBatchUpdateModal, TankUpdateModal} from "./tanks.modal"
import {TankRow, Thead} from "./tanks.table"

export const Tanks = () => {
  const name = useName()

  const query = useRecoilValue(queryAtom)
  const [selected, setSelected] = useRecoilState(selectedTanksAtom)
  const {setModalStore, closeModal} = useModal()

  const [page, setPage] = useState<number>(1)

  const [size, handleSize]         = useInput(DEFAULT),
        [sexual, handleSexual]     = useInput(DEFAULT),
        [pagesize, handlePagesize] = useInput("10"),
        [sortBy, handleSortBy]     = useInput(DEFAULT_SORT)

  const {ref, openUpload, handleFile} = useFile(async ev => {
    const data = import_data(ev)
    await updateTanks(data)
    toast("successfully import data")
  })

  const filter = clsx(
    `owner = ${name}`,
    size != DEFAULT ? `AND size = ${size}` : "",
    sexual != DEFAULT ? `AND sexual = ${sexual}` : ""
  )

  const sort = sortMap[sortBy] && sortMap[sortBy]

  const {data: tanks, count, mutate} = useSearch(
    query,
    {
      offset: +pagesize * (page - 1),
      limit: +pagesize,
      filter,
      sort: sort ? [sort] : undefined
    },
    [query, page, pagesize, filter, sort]
  )

  // [selectAll, setSelectAll] = useState<boolean>(false)

  const handleSelect = (id: string) => setSelected(
    prev => prev.includes(id)
      ? prev.filter(i => i != id)
      : [...prev, id]
  )

  const openAdd = () => setModalStore({type: ModalEnum.TankUpdate})
  const openUpdate = () => setModalStore({type: ModalEnum.TankBatchUpdate, param: selected})
  const openDelete = () => setModalStore({type: ModalEnum.ALERT, param: selected})

  const handleEdit = (tank: Tank) => {
    setSelected([tank.id])
    setModalStore({type: ModalEnum.TankUpdate, param: tank})
  }

  const handleSelectAll = async () => {
    if (selected.length === count) setSelected([])
    else {
      const {hits} = await meiliClient.search(query, {
        filter,
        sort: sort ? [sort] : undefined, limit: count
      })
      setSelected(hits?.map(d => d.id)!)
    }
  }

  const confirmUpdate = async (values: any) => {
    const updateObject = excludeUnset(values)

    const d = tanks?.filter(d => selected.includes(d.id))
      .map(d => ({...d, ...updateObject})) ?? []

    await Promise.all([updateTanks(d), mutate()])
    closeModal()
    toast("successfully updated!")
  }

  const confirmDelete = async () => {
    await deleteTanks(selected)
    closeModal()
    toast("successfully delete")
  }

  const exportData = async () => {
    const {hits} = await meiliClient.search(query, {
      filter,
      sort: sort ? [sort] : undefined, limit: count
    })
    export_data(hits, "tanks.xlsx")
  }

  return <main className={"px-12 lg:px-24 my-4"}>
    <div className={"flex items-center space-x-4 my-4"}>
      <button
        className={"inline-flex items-center space-x-2"}
        onClick={openAdd}
      >
        <Icon name={"add"} className={"size-6 text-cyan-400"}/>
        <span>add</span>
      </button>

      <button
        onClick={handleSelectAll}
        className={clsx("inline-flex items-center space-x-1", count === selected.length ? "text-violet-400" : "text-gray-300")}>
        <Icon name={"select-all"} className={"size-6 text-green-300"}/>
        <span>select all</span>
      </button>

      <button
        onClick={openUpdate}
        disabled={!selected.length}
        className={"inline-flex items-center space-x-1 disabled:text-gray-300 disabled:cursor-not-allowed"}
      >
        <Icon name={"update"} className={"size-6 text-purple-500/90"}/>
        <span>update</span>
      </button>

      <button
        className={"inline-flex items-center space-x-2"}
        onClick={openDelete}
      >
        <Icon name={"delete"} className={"size-6 scale-90 text-rose-500/90"}/>
        <span>delete</span>
      </button>

      <div className={"flex items-center"}>
        <input
          type="file"
          accept={"application/vnd.openxmlformats-officedocument." +
            "spreadsheetml.sheet,application/vnd.ms-excel"}
          ref={ref}
          className={"hidden"}
          onChange={handleFile}
        />
        <button className={"inline-flex items-center space-x-2"} onClick={openUpload}>
          <Icon name={"import"} className={"size-6 text-orange-400/90"}/>
          <span>import data</span>
        </button>
      </div>

      <button className={"inline-flex items-center space-x-2"} disabled={!tanks} onClick={exportData}>
        <Icon name={"export"} className={"size-6 text-cyan-500/90"}/>
        <span>export data</span>
      </button>
    </div>

    <div className={"flex items-center space-x-8 my-5"}>
      <Filter
        name={"size"}
        initial={DEFAULT}
        options={sizes}
        current={size}
        onChange={handleSize}
      />

      <Filter
        name={"sexual"}
        initial={DEFAULT}
        options={sexuals}
        current={sexual}
        onChange={handleSexual}
      />

      <Filter
        name={"sort by"}
        initial={DEFAULT_SORT}
        options={sorts}
        current={sortBy}
        onChange={handleSortBy}
      />

      {count > 25 && <Filter
        name={"page size"}
        className={"w-24"}
        initial={"10"}
        options={pagesizes}
        current={pagesize}
        onChange={handlePagesize}
      />}
    </div>

    <Table>
      <Thead/>
      <Tbody>
        {tanks && tanks.map((d: Tank, i: number) =>
          <TankRow
            key={d.id}
            tank={d}
            handleSelect={handleSelect}
            checked={selected.includes(d.id)}
            handleEdit={handleEdit}
          />
        )}
      </Tbody>
    </Table>

    {count > +pagesize && <Pagination pagesize={+pagesize} total={count} onPageChange={setPage}/>}

    <TankUpdateModal onSubmit={confirmUpdate}/>

    <TankBatchUpdateModal onSubmit={confirmUpdate}/>

    <AlertModal
      message={(p) => `Are you sure to delete these tanks(id: ${p})?`}
      onConfirm={confirmDelete}
    />
  </main>
}
