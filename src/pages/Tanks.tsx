import {updateTanks, useModal, useName, useSearch} from "@/hooks"
import {clsx, export_data, meiliClient, num2str} from "@/libs"
import {ModalEnum, queryAtom} from "@/stores"
import {Badge, Icon, Modal, Pagination, PopFilter, Table, Tbody, tdStyle, thStyle} from "@/widgets"
import {scaleOrdinal} from "d3-scale"
import {motion} from "framer-motion"
import React, {ChangeEvent, useState} from "react"
import {Field, Form, FormRenderProps} from "react-final-form"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {useRecoilValue} from "recoil"
import {DEFAULT, DEFAULT_SORT, pagesizes, sexuals, sizes, sortMap, sorts} from "./tank.constant"

type InputChangeEvent = ChangeEvent<HTMLInputElement>

type FormValues = {}

const color = scaleOrdinal<number, string>()
    .domain([1.5, 3, 10])
    .range(["#f899d7", "#a0b9f1", "#d3a9fd"]),
  icon = scaleOrdinal<string, string>()
    .domain(sorts)
    .range(["", "alpha-up", "alpha-down", "numeric-up", "numeric-down"])

export const Tanks = () => {
  const name = useName()

  const navigate = useNavigate()

  const query = useRecoilValue(queryAtom)
  const {type, param, setModalStore, closeModal} = useModal()

  const [page, setPage] = useState<number>(1),
    [size, setSize] = useState<string>(DEFAULT),
    [sexual, setSexual] = useState<string>(DEFAULT),
    [pagesize, setPagesize] = useState<number>(10),
    [sortBy, setSortBy] = useState(DEFAULT_SORT)

  const filter = clsx(
    `owner = ${name}`,
    size != DEFAULT ? `AND size = ${size}` : "",
    sexual != DEFAULT ? `AND sexual = ${sexual}` : ""
  )

  const sort = sortMap[sortBy] && sortMap[sortBy]

  const {data: tanks, count, mutate} = useSearch(
    query,
    {
      offset: pagesize * (page - 1),
      limit: pagesize,
      filter,
      sort: sort ? [sort] : undefined
    },
    [query, page, pagesize, filter, sort]
  )

  const [selected, setSelected] = useState<string[]>([])
  // [selectAll, setSelectAll] = useState<boolean>(false)

  const handleSize = (ev: InputChangeEvent) => setSize(ev.target.value),
    handleSexual = (ev: InputChangeEvent) => setSexual(ev.target.value),
    handlePagesize = (ev: InputChangeEvent) => setPagesize(+ev.target.value),
    handleSort = (ev: InputChangeEvent) => setSortBy(ev.target.value)

  const handleSelect = (id: string) => setSelected(
    prev => prev.includes(id)
      ? prev.filter(i => i != id)
      : [...prev, id]
  )

  const openUpdate = () => setModalStore({type: ModalEnum.TankModify})

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

  const cancelSelect = (id: string) => {
    if (selected.length === 1) {
      setSelected([])
      closeModal()
    } else setSelected(prev => prev.filter(i => i != id))
  }

  const confirmUpdate = async (values: any) => {
    const d = tanks?.filter(d => selected.includes(d.id)).map(d => ({
      ...d,
      birthday: values.test
    })) ?? []
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
      <div className="px-1" onChange={handleSort}>
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

    {count > 25 && <PopFilter name={"page size"} className={"w-24"} active={pagesize != 10}>
      <div className="px-2" onChange={handlePagesize}>
        {pagesizes.filter(d => d < count).map(d => <div key={d} className={"flex items-center pb-2"}>
            <input
              type="radio"
              name="pagesize"
              id={num2str(d)}
              value={d}
              checked={d === pagesize}
              className={"styledRadio"}
            />
            <label htmlFor={num2str(d)} className="text-xs font-grey-darker font-normal">
              {d}
            </label>
          </div>
        )}
      </div>
    </PopFilter>}
  </div>

  const formRender = ({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values
                      }: FormRenderProps<any, FormValues>) => (
    <form onSubmit={handleSubmit}>
      {/*<Field name="firstName">*/}
      {/*  {({input, meta}) => (*/}
      {/*    <div>*/}
      {/*      <label>First Name</label>*/}
      {/*      <input {...input} type="text" placeholder="First Name"/>*/}
      {/*      {meta.error && meta.touched && <span>{meta.error}</span>}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Field>*/}
      {/*<Field name="lastName">*/}
      {/*  {({input, meta}) => (*/}
      {/*    <div>*/}
      {/*      <label>Last Name</label>*/}
      {/*      <input {...input} type="text" placeholder="Last Name"/>*/}
      {/*      {meta.error && meta.touched && <span>{meta.error}</span>}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Field>*/}
      <Field name="test">
        {({input, meta}) => (
          <div>
            <label>Test input</label>
            <input
              {...input}
              type="text"
              placeholder="this will update birthday field"
              className={"w-48 pl-2.5 pr-1.5 py-1 ring-inset rounded-sm focus:outline-none focus:ring-1 focus:ring-indigo-300"}/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
      <div className="flex items-center space-x-2">
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button
          type="button"
          onClick={form.reset}
          disabled={submitting || pristine}
        >
          Reset
        </button>
      </div>
    </form>
  )

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

    <div className={"my-3 flex items-center space-x-3"}>
      <div className={"inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md border border-indigo-100"}>
        <span>male</span>
        <Icon name={"x"} className={"size-5"}/>
      </div>
    </div>

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
          <div className={clsx(thStyle, "w-2/5")}>genotype</div>
          <div className={clsx(thStyle, "w-1/10")}>sexual</div>
          <div className={clsx(thStyle, "w-1/10")}>birthday</div>
          <div className={clsx(thStyle, "w-1/10")}>operations</div>
        </div>
      </div>
      <Tbody>
        {tanks && tanks.map((d: Tank, i: number) =>
          <div key={d.id} className={"table-row whitespace-nowrap text-gray-700 odd:bg-gray-50/50"}>
            <div className={clsx(tdStyle, "inline-flex place-content-center py-2")}>
              <input
                type="checkbox"
                checked={selected.includes(d.id)}
                className={"justify-self-center w-5 h-5 rounded-sm border-1.5"}
                onChange={() => handleSelect(d.id)}
              />
              <span className={"inline-block w-16"}>{d.id}</span>
              {/*<div className={"flex items-center text-center"}>*/}
              {/* */}
              {/*</div>*/}
            </div>
            <div
              className={clsx(tdStyle, "font-medium")}
              style={{color: color(d.size)}}>
              {d.size}L
            </div>
            <div className={tdStyle}>{d.amount}</div>
            <div className={clsx(tdStyle, "truncate")}>{d.genotype}</div>
            <div className={tdStyle}>{d.sexual ??
              <div className={"text-gray-400/50 italic"}>&lt;null&gt;</div>}</div>

            <div className={tdStyle}>{d.birthday}</div>
            <div className={tdStyle}>
              <div className={"flex justify-around items-center"}>
                <button onClick={() => toRecordings(d.id)}>more</button>
                <button>
                  edit
                  <Icon name={"edit"} className={"size-4 text-sky-400"}/>
                </button>
              </div>
            </div>
          </div>)}
      </Tbody>
    </Table>

    {count > pagesize && <Pagination pageSize={pagesize} total={count} onPageChange={setPage}/>}

    <Modal name={ModalEnum.TankModify} title={"batch update"} className={"w-[600px]"}>
      <h2 className={"self-start"}>current selected:</h2>
      <motion.div layout className={"grid grid-cols-6 place-content-center gap-x-3 gap-y-2"}>
        {selected.map(d => <Badge key={d}>
          {d}
          <Icon name={"x"} role={"button"} onClick={() => cancelSelect(d)} className={"w-6 h-6"}/>
        </Badge>)}
      </motion.div>

      <Form
        initialValues={{
          // firstName: "",
          // lastName: "",
          // age: 0,
          test: ""
        }}
        onSubmit={confirmUpdate}
        render={formRender}
      />
    </Modal>
  </main>
}
