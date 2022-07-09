import {sum} from "d3-array"
import {scaleOrdinal} from "d3-scale"
import {arc, pie, PieArcDatum} from "d3-shape"
import {motion} from "framer-motion"
import React, {Fragment, useEffect, useState} from "react"

type Data = [string, number]

type PieChartProps = {
  data: { [key: string]: number }
  size?: number,
  margin?: number
  padAngle?: number
  radius?: number
  cornerRadius?: number
  colors?: string[]
  opacity?: number
  hoverScale?: number
  hoverOpacity?: number
}

const defaultColors = [
  "rgb(87,215,236)",
  "rgb(62,238,211)",
  "rgb(236,119,199)",
  "rgb(236,55,97)",
  "rgba(255,211,12,0.88)",
  "rgba(126,10,241,0.5)",
  "rgba(229,53,255,0.9)"
]

export const PieChart = ({
                           data,
                           size = 400,
                           margin = 20,
                           padAngle = 0.02,
                           radius = size / 2 - margin,
                           cornerRadius = 2,
                           colors = defaultColors,
                           opacity = 0.65,
                           hoverScale = 1.03,
                           hoverOpacity = 0.95
                         }: PieChartProps) => {
  const [sigma, setSigma] = useState<number>(0)

  const dataReady = Object.entries(data).slice(0, 10),
        total     = sum(dataReady, d => d[1])

  const pies = pie<Data>()
    .sort((a, b) => a[1] - b[1])
    .value(d => d[1])(dataReady)

  const arcFn      = arc<PieArcDatum<Data>>()
          // .startAngle(d => d.startAngle * sigma)
          // .endAngle(d => d.endAngle * sigma)
          .padAngle(padAngle)
          .innerRadius(radius * 0.4)
          .outerRadius(radius * 0.65)
          .cornerRadius(d => d.value / total >= 0.1 ? cornerRadius : 0),
        innerArcFn = arc<PieArcDatum<Data>>()
          .innerRadius(radius * 0.62)
          .outerRadius(radius * 0.62),
        outerArcFn = arc<PieArcDatum<Data>>()
          .innerRadius(radius * 0.68)
          .outerRadius(radius * 0.68)

  const color = scaleOrdinal<string>().range(colors)

  useEffect(() => {

    // const trans = transition().duration(1300)
    //
    // trans.tween("height", () => (t: number) => {
    //   setSigma(t)
    // })
  }, [])

  return <svg width={size} height={size}>
    <g transform={`translate(${size / 2}, ${size / 2})`}>
      {pies.map((d, i) => {
        const posStart = innerArcFn.centroid(d),
              posBreak = outerArcFn.centroid(d)

        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posBreak[0] = radius * 0.65 * (midAngle < Math.PI ? 1 : -1)

        const pointsFn = (d: PieArcDatum<Data>) => {
          const posA = innerArcFn.centroid(d)
          const posB = outerArcFn.centroid(d)
          const posC = outerArcFn.centroid(d)
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          posC[0] = radius * 0.68 * (midangle < Math.PI ? 1 : -1)
          return `${posA}, ${posB}, ${posC}`
        }

        return <Fragment key={`${d.startAngle}-${d.endAngle}`}>
          <motion.path
            d={arcFn(d)!}
            fill={color(`${i}`)}
            opacity={opacity}
            whileHover={{scale: hoverScale, opacity: hoverOpacity}}
          />
          <text transform={`translate(${arcFn.centroid(d)})`} textAnchor={"middle"} fill={"#fff"}
                className={"fill-white text-[11px]"}>
            {d.value}
          </text>
          <polyline
            points={pointsFn(d)}
            strokeDasharray={"3 2"}
            className={"fill-transparent stroke-1 stroke-gray-300"}
          />
          <text
            transform={`translate(${posBreak})`}
            textAnchor={midAngle < Math.PI ? "start" : "end"}
            className={"text-[8px] fill-gray-600"}
          >{d.data[0]}</text>
        </Fragment>
      })}
    </g>
  </svg>
}
