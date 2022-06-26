import {range} from "d3-array"
import React, {useState} from "react"
import {Icon} from "@/widgets/Icons";

type Props = {
  total: number,
  onPageChange?: (page: number) => void,
  pageSize?: number
}

export const Pagination = ({total, onPageChange, pageSize = 11}: Props) => {
  const [page, setPage] = useState(1)

  const buttonList = range(Math.ceil(total / pageSize)).map(i => i + 1)

  const buttonStyle = "px-3 py-1.5 font-medium bg-[#edf2f7] text-[#1a202c] rounded-md" +
    " ring-inset hover:text-gray-600 hover:bg-gray-100"
  const disabledStyle = "disabled:text-[#a0a3a8] disabled:cursor-not-allowed hover:ring-0"

  const handlePrev = () => handleChange(page - 1)

  const handleChange = (page: number) => {
    onPageChange?.(page)
    setPage(page)
  }

  const handleNext = () => handleChange(page + 1)

  return <div className={"flex justify-center items-center space-x-2 mx-auto my-4"}>
    {total > pageSize && <button
      onClick={handlePrev}
      disabled={page === 1}
      className={disabledStyle}
    >
      <Icon name={"chevron-left"} className={"size-6"}/>
    </button>}

    {buttonList.map(i =>
      <button
        key={i}
        className={`${buttonStyle} ${page === i && "text-[#fff] bg-indigo-500"}`}
        onClick={() => handleChange(i)}>
        {i}
      </button>
    )}

    {
      total > pageSize && <button
        onClick={handleNext}
        disabled={page === buttonList[buttonList.length - 1]}
        className={disabledStyle}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
        </svg>
      </button>
    }
    {/*<div className={"px-2 py-1 bg-gray-100 rounded-sm shadow-md"}>*/}
    {/*  {total}条*/}
    {/*</div>*/}
  </div>
}
