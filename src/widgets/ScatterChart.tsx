import {range} from "d3-array"
import {scaleBand, scaleLinear} from "d3-scale"

export const ScatterChart = () => {
  const width  = 300,
        height = 240,
        margin = {left: 20, right: 20, top: 30, bottom: 40}

  const directions = [
    "N", "NNW", "NW", "WNW",
    "W", "WSW", "SW", "SSW",
    "S", "SSE", "SE", "ESE",
    "E", "ENE", "NE", "NNE"
  ]

  const x = scaleLinear()
          .domain(range(1, 25))
          .range([0, width]),
        y = scaleBand()
          .domain(directions)
          .range([height, 0])

  return <svg
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
  >
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g id={"axis-left"}/>
      <g id={"axis-bottom"}/>
      {data.map((d, i) =>
        <circle
          key={i}
          cx={x(i + 1)}
          cy={y(d)}
          r={3}
          fill={"skyblue"}
        />)}
    </g>
  </svg>
}

const data = [
  "NNW", "N", "NNW", "N",
  "NNW", "NNW", "N", "NE",
  "E", "NE", "N", "WNW",
  "E", "SE", "N", "NNW",
  "N", "NE", "NNW", "N",
  "N", "NNW", "NNW", "N"
]
