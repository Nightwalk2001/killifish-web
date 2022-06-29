import {updateTanks, useInput, useModal, useName, useSearch} from "@/hooks"
import {clsx, excludeUnset, export_data, meiliClient} from "@/libs"
import {ModalEnum, queryAtom, selectedTanksAtom} from "@/stores"
import {Icon, Pagination, PopFilter, Table, Tbody, thStyle} from "@/widgets"
import {scaleOrdinal} from "d3-scale"
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useRecoilState, useRecoilValue} from "recoil"
import {toast} from "react-toastify"
import {DEFAULT, DEFAULT_SORT, pagesizes, sexuals, sizes, sortMap, sorts} from "./tank.constant"
import {ModifyTankModal} from "./tanks.modal"
import {TankRow} from "./tank.table"

const icon = scaleOrdinal<string, string>()
  .domain(sorts)
  .range(["", "alpha-up", "alpha-down", "numeric-up", "numeric-down"])

export const Tanks = () => {
  const name = useName()

  const navigate = useNavigate()

  const query = useRecoilValue(queryAtom)
  const [selected, setSelected] = useRecoilState(selectedTanksAtom)
  const {type, param, setModalStore, closeModal} = useModal()

  const [page, setPage] = useState<number>(1)

  const [size, handleSize]         = useInput(DEFAULT),
        [sexual, handleSexual]     = useInput(DEFAULT),
        [pagesize, handlePagesize] = useInput("10"),
        [sortBy, handleSortBy]     = useInput(DEFAULT_SORT)

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

  const openUpdate = () => setModalStore({type: ModalEnum.TankBatchModify, param: selected})

  const handleSelectAll = async () => {
    if (selected.length) setSelected([])
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
    const res = await updateTanks(d)
    console.log(res)
    closeModal()
    toast("successfully updated!")
    await mutate()
  }

  const exportData = () => tanks && export_data(tanks, "tanks.xlsx")

  const searchPanel = <div className={"flex items-center space-x-8 my-3"}>
    <PopFilter name={"size"} active={size != DEFAULT}>
      <div className="px-2" onChange={handleSize}>
        {sizes.map(d => <div key={d} className={"flex items-center pb-2"}>
            <input
              type="radio"
              name="trigger"
              id={d}
              value={d}
              checked={d === size}
              className={"styledRadio"}
            />
            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
          </div>
        )}
      </div>
    </PopFilter>

    <PopFilter name={"sexual"} active={sexual != DEFAULT}>
      <div className="px-2" onChange={handleSexual}>
        {sexuals.map(d => <div key={d} className={"flex items-center pb-2"}>
            <input
              type="radio"
              name="date"
              id={d}
              value={d}
              checked={d === sexual}
              className={"styledRadio"}
            />
            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
          </div>
        )}
      </div>
    </PopFilter>

    <PopFilter name={"sort by"} className={"w-36 whitespace-nowrap"} active={sortBy != "None"}>
      <div className="px-1" onChange={handleSortBy}>
        {sorts.map(d => <div key={d} className={"flex items-center pb-2"}>
          <input
            type="radio"
            name="trigger"
            id={d}
            value={d}
            checked={d === sortBy}
            className={"styledRadio"}
          />
          <label htmlFor={d} className={"text-xs font-grey-darker font-normal"}>
              <div className={"inline-flex justify-between items-center w-16"}>
                {d.split(":")[0]}
                {icon(d) && <Icon name={icon(d)} className={"size-5"}/>}
              </div>
            </label>
          </div>
        )}
      </div>
    </PopFilter>

    {count > 25 && <PopFilter name={"page size"} className={"w-24"} active={pagesize != "10"}>
      <div className="px-2" onChange={handlePagesize}>
        {pagesizes.filter(d => +d < count).map(d => <div key={d} className={"flex items-center pb-2"}>

          <input
            type="radio"
            name="pagesize"
            id={d}
            value={d}
            checked={d === pagesize}
            className={"styledRadio"}
          />
          <label htmlFor={d} className="text-xs font-grey-darker font-normal">
            {d}
          </label>
          </div>
        )}
      </div>
    </PopFilter>}
  </div>

  const toRecordings = (id: string) => navigate(`/recordings/${id}`)

  return <main className={"px-12 lg:px-24 my-4"}>
    <div className={"flex space-x-4 my-4"}>
      <button
        onClick={openUpdate}
        disabled={!selected.length}
        className={"inline-flex items-center space-x-1 disabled:text-gray-300 disabled:cursor-not-allowed"}
      >
        <Icon name={"update"} className={"size-6 text-purple-500/90"}/>
        <span>update</span>
      </button>

      <button
        onClick={handleSelectAll}
        className={clsx("inline-flex items-center space-x-1", count === selected.length ? "text-violet-400" : "text-gray-300")}>
        <Icon name={"select-all"} className={"size-6 text-green-300"}/>
        <span>select all</span>
      </button>

      <button className={"inline-flex items-center space-x-2"}>
        <Icon name={"import"} className={"size-6 text-orange-400/90"}/>
        <span>import data</span>
      </button>

      <div role={"button"}>

      </div>

      <button className={"inline-flex items-center space-x-2"} disabled={!tanks} onClick={exportData}>
        <span>export data</span>
        <Icon name={"export"} className={"size-6 text-cyan-500/90"}/>
      </button>
    </div>

    {searchPanel}

    {/*<div className={"my-3 flex items-center space-x-3"}>*/}
    {/*  <div className={"inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md border border-indigo-100"}>*/}
    {/*    <span>male</span>*/}
    {/*    <Icon name={"x"} className={"size-5"}/>*/}
    {/*  </div>*/}
    {/*</div>*/}

    <Table>
      <div className={"table-header-group text-center"}>
        <div className={"table-row bg-gray-200/70"}>
          <div className={clsx(thStyle, "w-1/8")}>
            <div role={"button"} className={"flex items-center w-fit mx-auto"}>
              <Icon name={"primary-key"} className={"size-4 text-[#80cbc4]"}/>
              <span className={"ml-0.5 mr-1"}>tank id</span>
              <Icon name={"alpha-sort"} className={"size-4"}/>
            </div>
          </div>
          <div role={"button"} className={clsx(thStyle, "w-1/10")}>
            <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
              <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
              <span>size</span>
              <Icon name={"numeric-sort"} className={"size-4"}/>
            </div>
          </div>
          <div className={clsx(thStyle, "w-1/10")}>
            <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
              <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
              <span>amount</span>
              <Icon name={"alpha-sort"} className={"size-4"}/>
            </div>
          </div>
          <div className={clsx(thStyle, "w-3/8")}>
            <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
              <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
              genotype
              <Icon name={"alpha-sort"} className={"size-4"}/>
            </div>
          </div>
          <div className={clsx(thStyle, "w-1/10")}>
            <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
              <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
              sexual
            </div>
          </div>
          <div className={clsx(thStyle, "w-1/10")}>
            <div className={"flex items-center space-x-0.5 w-fit mx-auto"}>
              <Icon name={"label"} className={"size-4 text-[#80cbc4]"}/>
              age
              <Icon name={"alpha-sort"} className={"size-4"}/>
            </div>
          </div>
          <div className={clsx(thStyle, "w-1/10")}>
            operations
          </div>
        </div>
      </div>
      <Tbody>
        {tanks && tanks.map((d: Tank, i: number) =>
          <TankRow
            key={d.id}
            tank={d}
            handleSelect={handleSelect}
            checked={selected.includes(d.id)}
            handleMore={toRecordings}
          />
        )}
      </Tbody>
    </Table>

    {count > +pagesize && <Pagination pageSize={+pagesize} total={count} onPageChange={setPage}/>}

    <ModifyTankModal onSubmit={confirmUpdate}/>
  </main>
}
