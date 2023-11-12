import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const data = [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}]


const height = 600;
const width = 1000;

const margins = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 20
}

const lettersByAsc = data
  .sort((a,b)=> a.frequency - b.frequency)
  .map(({ letter }) => letter)

const lettersAmount = lettersByAsc.length

const lettersRange = d3.range(lettersAmount + 1, 1, -1)
  .map(a => a * 35)

const svg = d3.select('#container')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

const maxFrequency = 0.1;

const yScaleMax = height - margins.top - margins.bottom

const yRange = d3.range(1, 13)

const yScale = d3.scaleLinear([0, d3.max(data, d=> d.frequency)], [yScaleMax, 0])

const xDomain = d3.groupSort(data, ([d]) => d.frequency, d => d.letter)

const xScale = d3.scaleBand(lettersByAsc, [d3.max(lettersRange), 0]).paddingInner(0.1)


const axisBottom = d3.axisBottom(xScale)

svg
  .append('g')
  .call(axisBottom.tickSizeOuter(0))
  .attr('transform', `translate(${margins.left}, ${height - margins.bottom})`)


const axisLeft = d3.axisLeft(yScale)

svg.append('g')
  .call(d3.axisLeft(yScale).tickFormat((y) => (y * 100).toFixed()))
  // .call(axisLeft.tickFormat((d, i) => d))
  .call(g => g.select('.domain').remove())
  .attr('transform', `translate(${margins.left}, ${+margins.top})`)
  // .attr('transform', `rotate(-90)`)

svg.append('g')
  .attr('transform', `translate(${margins.left}, ${-margins.top})`)
  .call(g =>
    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', d => (yScale(0) - yScale(d.frequency)))
      .attr('data-id', d => d.letter)
      .attr('y', d => yScale(d.frequency) + margins.top + margins.bottom
      )
      .attr('x', x => xScale(x.letter))
      .style('fill', '#3a3a3a')
  )


svg.append('g')
    .attr('transform', 'translate(0, 0)')
  .call(g => g
    .append('text')
    .attr('fill', '#000')
    .attr('x', 5)
    .attr('y', 15)
    .attr('dy', '0.32em')
    .attr('font-size', '14')
    .attr('font-weight', 'bold')
    .attr('text-anchor', 'start')
    .text("↑ Frequency (%)")
  )
