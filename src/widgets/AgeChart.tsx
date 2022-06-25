import {axisBottom, axisLeft} from "d3-axis"
import {scaleBand, scaleLinear} from "d3-scale"
import {select} from "d3-selection"
import {useEffect, useRef} from "react"

export const AgeChart = () => {
  const
    width  = 500,
    height = 300,
    margin = {left: 30, top: 5, bottom: 20}

  const periods = ["today", "three days", "a week", "a month", "three months", "nine months"]

  const containerRef = useRef<SVGGElement>(null)

  const x = scaleBand()
          .domain(periods)
          .range([0, width]),
        y = scaleLinear()
          .domain([0, 400])
          .range([height, 0])

  useEffect(() => {
    const container = select(containerRef.current)

    container
      .select<SVGGElement>(".axis-left")
      .call(axisLeft(y).tickSize(0))

    container
      .select<SVGGElement>(".axis-bottom")
      .call(axisBottom(x).tickSize(0))
  }, [])

  return <svg
    width={width + margin.left}
    height={height + margin.top + margin.bottom}
  >
    <g ref={containerRef} transform={`translate(${margin.left}, ${margin.top})`}>
      <g className={"axis-left"}/>
      <g className={"axis-bottom"} transform={`translate(0, ${height})`}/>


    </g>
  </svg>
}
