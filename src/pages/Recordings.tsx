import {useFindOne, useRequest} from "@/hooks"
import {clsx, getter} from "@/libs"
import {Icon, PopFilter, Table, TankProfile, Tbody, tdStyle, Thead} from "@/widgets"
import {differenceInDays} from "date-fns"
import {ChangeEvent, useEffect, useState} from "react"
import {useParams, useSearchParams} from "react-router-dom"

const headers = [
    "owner",
    // "size",
    "genotype",
    // "sexual",
    "age",
    "quantity",
    "trigger",
    "time",
    "result"
]

type InputChangeEvent = ChangeEvent<HTMLInputElement>

const triggers = ["ALL", "AUTO", "MANUAL"],
    results = ["ALL", "SUCCESS", "FAIL"],
    dates = ["ALL", "within 3 days"],
    pagesizes = ["10", "15", "20", "30", "50"],
    sorts = ["None", "owner", "genotype", "age", "time"]

const DEFAULT = "ALL",
    DEFAULT_PAGESIZE = "10",
    DEFAULT_SORT = "None"

export const Recordings = () => {
    const {id} = useParams(),
        [params, setParams] = useSearchParams()

    const {data: tank} = useFindOne(id, [id])

    const [trigger, setTrigger] = useState<string>(DEFAULT),
        [result, setResult] = useState<string>(DEFAULT),
        [pagesize, setPagesize] = useState<string>(DEFAULT_PAGESIZE),
        [date, setDate] = useState<string>(DEFAULT),
        [sort, setSort] = useState<string>(DEFAULT_SORT)

    // const params = `id=${id}&trigger=${trigger}&result=${result === "SUCCESS"}&pagesize=${pagesize}`

    const {data} = useRequest<Recording[]>(`/recordings/${id}?${params}`, getter)

    const handleTrigger = (ev: InputChangeEvent) => setTrigger(ev.target.value),
        handleResult = (ev: InputChangeEvent) => setResult(ev.target.value),
        handlePagesize = (ev: InputChangeEvent) => setPagesize(ev.target.value),
        handleDate = (ev: InputChangeEvent) => setDate(ev.target.value),
        clearFilters = () => {
            setTrigger(DEFAULT)
            setResult(DEFAULT)
            setPagesize(DEFAULT_PAGESIZE)
            setDate(DEFAULT)
            setSort(DEFAULT_SORT)
        }

    useEffect(() => {
        setParams(`id=${id}&trigger=${trigger}&result=${result === "SUCCESS"}&pagesize=${pagesize}`)
    }, [id, trigger, result, pagesize])

    return <div className={"w-11/12 mx-auto mt-8 mb-5 "}>
        {tank && <TankProfile {...tank}/>}

        <div>
            operations: <button className={"px-3 py-2 text-white bg-sky-300 rounded-md"}>Manually Feed</button>
        </div>

        <h2>Feeding Info</h2>
        <div className={"flex space-x-8 my-3"}>
            <PopFilter name={"trigger"} active={trigger != "ALL"}>
                <div className="px-2" onChange={handleTrigger}>
                    {triggers.map(d => <div key={d} className={"flex items-center pb-2"}>
                            <input
                                type="radio"
                                name="trigger"
                                id={d}
                                value={d}
                                checked={d === trigger}
                                className={"styledRadio"}
                            />
                            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
                        </div>
                    )}
                </div>
            </PopFilter>

            <PopFilter name={"result"}>
                <div className="px-2" onChange={handleResult}>
                    {results.map(d => <div key={d} className={"flex items-center pb-2"}>
                            <input
                                type="radio"
                                name="date"
                                id={d}
                                value={d}
                                className={"styledRadio"}
                            />
                            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
                        </div>
                    )}
                </div>
            </PopFilter>

            <PopFilter name={"age"} className={"w-36"}>
                <div className="px-2" onChange={handleDate}>
                    {dates.map(d => <div key={d} className={"flex items-center pb-2"}>
                            <input
                                type="radio"
                                name="date"
                                id={d}
                                value={d}
                                className={"styledRadio"}
                            />
                            <label htmlFor={d}
                                   className="text-xs font-grey-darker font-normal whitespace-nowrap">{d}</label>
                        </div>
                    )}
                </div>
            </PopFilter>

            <PopFilter name={"page size"} className={"w-36"}>
                <div className="px-2 grid grid-cols-2 place-content-center gap-x-3" onChange={handlePagesize}>
                    {pagesizes.map(d => <div key={d} className={"flex items-center pb-2"}>
                            <input
                                type="radio"
                                name="pagesize"
                                id={d}
                                value={d}
                                className={"styledRadio"}
                            />
                            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
                        </div>
                    )}
                </div>
            </PopFilter>

            <PopFilter name={"sort by"}>
                <div className="px-2" onChange={handleDate}>
                    {sorts.map(d => <div key={d} className={"flex items-center pb-2"}>
                            <input
                                type="radio"
                                name="trigger"
                                id={d}
                                value={d}
                                className={"styledRadio"}
                            />
                            <label htmlFor={d} className="text-xs font-grey-darker font-normal">{d}</label>
                        </div>
                    )}
                </div>
            </PopFilter>
        </div>

        {
            <div className={"flex space-x-3 my-6"}>
                <div>filters:</div>

                <button
                    className={"text-cyan-300 transition-all duration-300 hover:animate-pulse active:scale-90"}>clear
                    filters
                </button>
            </div>
        }

        <Table>
            <Thead headers={headers}/>
            <Tbody>
                {data && data.map(d =>
                    <div
                        key={`${d.tank}-${d.time}`}
                        className={"table-row text-center text-gray-700"}>

                        <div className={clsx(tdStyle, "py-2.5")}>{d.owner}</div>

                        <div className={clsx(tdStyle, "max-w-8")}>{d.genotype}</div>

                        <div
                            className={tdStyle}>{d.birthday ? differenceInDays(Date.parse(d.birthday), new Date()) + "d" :
                            <span className={"text-gray-300 italic"}>null</span>}</div>
                        <div className={tdStyle}>{d.quantity}</div>

                        <div
                            style={{
                                color: d.trigger === "AUTO" ? "#dcb7f5" : "#7dfcf7"
                            }}
                            className={
                                clsx(tdStyle, "py-2.5 font-medium")
                            }>{d.trigger}</div>

                        <div className={clsx(tdStyle, "whitespace-nowrap")}>{d.time}</div>

                        {d.succeed
                            ? <div className={tdStyle}>
                                <Icon name={"success"} className={"w-7 h-7 scale-95 mx-auto text-green-500/80"}/>
                            </div>
                            : <div className={tdStyle}>
                                <Icon name={"fail"} className={"w-7 h-7 mx-auto fill-red-500/80"}/>
                            </div>
                        }
                    </div>
                )}
            </Tbody>
        </Table>

    </div>
}
