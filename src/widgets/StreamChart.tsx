import {scaleLinear, scaleOrdinal} from "d3-scale"
import {area, curveNatural, stack, stackOffsetSilhouette} from "d3-shape"
import {useRef} from "react"
import data from "./stream.json"

type Data = {
  year: number
}

export const StreamChart = () => {
  const ref = useRef<SVGGElement>(null)
  const margin = {left: 10, right: 10, top: 70, bottom: 10},
        w      = 700,
        h      = 250,
        width  = w - margin.left - margin.right,
        height = margin.top - margin.bottom

  const x     = scaleLinear()
          .domain([2000, 2050])
          .range([0, width]),
        y     = scaleLinear()
          .domain([-1.5, 1.5])
          .range([height, 0]),
        color = scaleOrdinal<string>()
          .range([
            "#636efa", "#c286fa", "#aa63f9",
            "#19d1f1", "#fe6691", "#297fe1",
            "#f6c9e0", "#fecb52"
          ])

  const stacked = stack()
    .offset(stackOffsetSilhouette)
    .keys(["group-1", "group-2", "group-3", "group-4", "group-5", "group-6", "group-7"])
    (data)

  const areaFn = area<any>()
    .x(d => x(d.data.year))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]))
    .curve(curveNatural)

  return <div className={"relative w-fit mx-auto"}>
    <svg width={w} height={h}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        {stacked.map((d, i) => {
          return <path key={d.key} d={areaFn(d)!} fill={color(d.key)}/>
        })}
      </g>
    </svg>
  </div>
}
