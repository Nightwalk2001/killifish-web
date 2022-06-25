import {updateTanks, useModal, useName, useSearch} from "@/hooks"
import {clsx, num2str} from "@/libs"
import {ModalEnum, queryAtom} from "@/stores"
import {Badge, Modal, Pagination, PopFilter, Table, Tbody, tdStyle, thStyle} from "@/widgets"
import {XIcon} from "@/widgets/Icons"
import {scaleOrdinal} from "d3-scale"
import {motion} from "framer-motion"
import React, {ChangeEvent, useState} from "react"
import {Field, Form} from "react-final-form"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {useRecoilValue} from "recoil"

type InputChangeEvent = ChangeEvent<HTMLInputElement>

const headers = ["tank id", "size", "amount", "genotype", "sexual", "birthday", "operations"]

const AlphaUp = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-sort-alpha-up" viewBox="0 0 16 16">
    <path fillRule="evenodd"
          d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
    <path
        d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
</svg>

const AlphaDown = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
    <path fillRule="evenodd"
          d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
    <path
        d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
</svg>

const NumericUp = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-sort-numeric-up" viewBox="0 0 16 16">
    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
    <path fillRule="evenodd"
          d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
    <path
        d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
</svg>

const NumericDown = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
    <path fillRule="evenodd"
          d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
    <path
        d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
</svg>

const sizes = ["ALL", "1.5", "3", "10"],
    sexuals = ["ALL", "male", "female"],
    pagesizes = [10, 28, 50, 100],
    sorts = ["None", "tank id:1", "tank id:-1", "size:1", "size:-1"],
    DEFAULT = "ALL",
    DEFAULT_SORT = "None"

const sortMap: { [p: string]: string } = {
    "tank id:1": "id:asc",
    "tank id:-1": "id:desc",
    "size:1": "size:asc",
    "size:-1": "size:desc"
}

const color = scaleOrdinal<number, string>()
        .domain([1.5, 3, 10])
        .range(["#f899d7", "#a0b9f1", "#d3a9fd"]),
    icon = scaleOrdinal<string, React.ReactNode>()
        .domain(sorts)
        .range(["", AlphaUp, AlphaDown, NumericUp, NumericDown])

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

    const handleSelectAll = () => setSelected(prev => prev.length ? [] : tanks?.map(d => d.id)!)

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
                            <div className={"inline-flex justify-between items-center w-14"}>
                                {d.split(":")[0]}
                                {icon(d)}
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

    const toRecordings = (id: string) => navigate(`/recordings/${id}`)

    return <main className={"pl-8 pr-6 my-4"}>
        <div className={"flex space-x-4 my-4"}>

            <button
                onClick={openUpdate}
                disabled={!selected.length}
                className={"disabled:text-gray-300 disabled:cursor-not-allowed"}
            >
                batch update
            </button>

            <button
                onClick={handleSelectAll}
                className={count === selected.length ? "text-violet-400" : "text-gray-300"}>
                select all
            </button>

            <button>
                import data
            </button>

            <button>
                export data
            </button>
        </div>

        {searchPanel}

        <Table>
            <div className={"table-header-group text-center"}>
                <div className={"table-row"}>
                    <div className={clsx(thStyle, "w-1/10")}>
                        <div className={"flex items-center w-fit mx-auto"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="fill-[#80cbc4]" viewBox="0 0 16 16">
                                <path
                                    d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            <span className={"ml-0.5 mr-1"}>tank id</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                 className={"text-gray-400/90"}>
                                <path fill="currentColor" d="M11 7H5l3-4zM5 9h6l-3 4z"/>
                            </svg>
                        </div>
                    </div>
                    <div role={"button"} className={clsx(thStyle, "w-1/10")}>
                        <div className={"flex items-center space-x-2 w-fit mx-auto"}>
                            <span>size</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-list-ol" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                                <path
                                    d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
                            </svg>
                        </div>
                    </div>
                    <div className={clsx(thStyle, "w-1/10")}>amount</div>
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
                                <button>edit</button>
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
                    <XIcon role={"button"} onClick={() => cancelSelect(d)} className={"w-6 h-6"}/>
                </Badge>)}
            </motion.div>

            <Form
                initialValues={{
                    // firstName: "",
                    // lastName: "",
                    // age: 0
                    test: ""
                }}
                onSubmit={confirmUpdate}
                render={({handleSubmit, form, submitting, pristine, values}) => (
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
                )}
            />
        </Modal>
    </main>
}
