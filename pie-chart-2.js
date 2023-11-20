import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const data = [{"name":"<5","value":19912018},{"name":"5-9","value":20501982},{"name":"10-14","value":20679786},{"name":"15-19","value":21354481},{"name":"20-24","value":22604232},{"name":"25-29","value":21698010},{"name":"30-34","value":21183639},{"name":"35-39","value":19855782},{"name":"40-44","value":20796128},{"name":"45-49","value":21370368},{"name":"50-54","value":22525490},{"name":"55-59","value":21001947},{"name":"60-64","value":18415681},{"name":"65-69","value":14547446},{"name":"70-74","value":10587721},{"name":"75-79","value":7730129},{"name":"80-84","value":5811429},{"name":"≥85","value":5938752}]

const leastFive = data.slice(-5)

console.log(leastFive)
const height = 600;
const width = 800;

const margins = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 20
}

const outerRadius = 0.9 * height / 2

const svg = d3.select('#container')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('viewBox', [0, 0, width, height])

const pie = d3.pie().value(d => d.value).sort(d => d.value)

const pieData = pie(data)

const arc = d3.arc()
  .innerRadius(0.1)
  .outerRadius(outerRadius)

const labelArc = d3.arc()
  .innerRadius(0.1)
  .outerRadius(outerRadius * 1.75)

const names = d3.map(data, x => x.name);
const namesSet =   new d3.InternSet(names);

const quantize = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), namesSet.size)
const color = d3.scaleOrdinal(names, quantize)


// const colorScale = d3.scaleLinear(d3.extent(data.map(({ value }) => value)), ['red', 'yellow'])

svg
  .append('g')
  .attr('transform', `translate(${ width / 2 },${ height / 2 })`)
  .selectAll('path')
  .data(pieData.sort((a,b) => a.index - b.index))
  .join('path')
  .style('stroke', 'white')
  .style('stroke-width', 2)
  .attr('d', arc)
  .style('fill', d => {
    return color(d.data.name)
    }
  )

svg
  .append('g')
  .attr('transform', `translate(${ width / 2 },${ height / 2 })`)
  .selectAll('path')
  .data(pieData)
  .join('text')
  .style('stroke', 'black')
  .attr('transform', d => `translate(${ labelArc.centroid(d) })`)
  .attr('font-size', '10px')
  .style('font-weight', 300)
  .attr('text-anchor', 'middle')
  .style('fill', 'black')
  .call(text =>
    text
      .selectAll('tspan')
      .data(d => [
        {value: d.data.name, position: d.index },
        {value: d.data.value, position: d.index }
      ])
      .join('tspan')
      .attr('x', 0)
      .attr('dy', (_, i) => i ? 15 : 0)
      .style('font-weight', (_, i) => i ? 300 : 400)
      .text(({value, position}, i) => {

        if (!i) return value
        else return position < 13 ? value : ""
      })
  )

