import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


const data = [
  {
    country: "Germany",
    value: 449
  },
  {
    country: "Ireland",
    value: 412
  },
  {
    country: "Finland",
    value: 323.21,
  },
  {
    country: "Denmark",
    value: 323
  },
  {
    country: "Belgium",
    value: 280
  },
  {
    country: "Netherlands",
    value: 260
  },
  {
    country: "Luxembourg",
    value: 255.28
  },
  {
    country: "Spain",
    value: 220
  },
  {
    country: "Sweden",
    value: 207
  },
  {
    country: "Czechia",
    value: 205
  },
  {
    country: "France",
    value: 204
  },
  {
    country: "United Kingdom",
    value: 197.71,
  },
  {
    country: "Estonia",
    value: 150,
  },
  {
    country: "Italy",
    value: 150
  },
  {
    country: "Portugal",
    value: 147
  },
  {
    country: "Lithuania",
    value: 129
  },
  //...
  {
    country: "Slovakia",
    value: 69
  },
  {
    country: "Hungary",
    value: 60.6
  },
  {
    country: "Austria",
    value: 40,
  },
  {
    country: "Poland",
    value: 15.09
  }
]

const height = 600;
const width = 1000;

const margins = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 30
}

const countriesByDesc = data
  .sort((a,b) => b.value - a.value)
  .map(({ country }) => country)
const countriesByAsc = data
  .sort((a,b) => a.value - b.value)
  .map(({ country }) => country)

const xScale = d3.scaleLinear([0, 500], [0, width - margins.right - margins.left])

const yScale = d3.scaleBand(countriesByAsc, [height - margins.top, margins.bottom]).padding(0.2)

const xAxis = d3.axisBottom()

const yAxis = d3.axisLeft()

const svg = d3.select('#container')
  .append('div')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

svg
  .append('g')
  .call(xAxis.scale(xScale))
  .attr('transform', `translate(${margins.left}, ${height - margins.bottom})`)


svg
  .append('g')
  .call(yAxis.scale(yScale).tickFormat(d => d.substring(0, 3).toUpperCase()))
  .attr('transform', `translate(${margins.left}, 0)`)

svg
  .append('g')
  .attr('transform', `translate(${margins.left}, 0)`)
  .call(g =>
      g
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('width', d => xScale(d.value))
        .attr('height', yScale.bandwidth())
        .attr('x', 0)
        .attr('y', d => yScale(d.country))
        .style('fill', '#13274F')
  )

svg
  .append('g')
  .attr('transform', `translate(${margins.left},0)`)
  .call(g =>
      g
        .append('text')
        .attr('x', 5)
        .attr('y', 20)
        .attr('font-size', 16)
        .style('text-anchor', 'start')
        .text('Financial support for a single Ukrainian refugee in accommodation per month in Europe as of June 2022, by selected country(in euros)')
    )
