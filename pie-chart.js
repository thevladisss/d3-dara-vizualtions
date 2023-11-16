import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const USData = [
  { type: 'Poultry', value: 48.9954 },
  { type: 'Beef', value: 25.9887 },
  { type: 'Pig', value: 22.9373 },
  { type: 'Sheep', value: 0.4869 }
]


const height = 600;
const width = 800;

const margins = {
  top: 30,
  bottom: 30,
  left: 30,
  right: 20
}


const svg = d3.select('#container')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .attr('viewBox', [0, 0, width, height])

const types = USData.map(({ type }) => type)

const colorScale = d3.scaleOrdinal(types, ['red' ,'yellow', 'orange', 'brown'])

const arc = d3.arc()
  .innerRadius(0.5 * height / 2)
  .outerRadius(0.75 * height / 2)


const pie = d3.pie()
  .value(d => d.value)

const labelArc = d3.arc()
  .innerRadius( 0.95 * height / 2 )
  .outerRadius( 0.95 * height / 2 )


const pieArcs = pie(USData)


svg
  .append('g')
  .attr('transform', `translate(${ width / 2 },${ height / 2 })`)
  .selectAll('path')
  .data(pieArcs)
  .join('path')
  .style('stroke', 'white')
  .style('stroke-width', 2)
  .style('fill', d => colorScale(d.data.type))
  .attr('d', arc)
  // )

const text = svg
  .append('g')
  .attr('transform', `translate(${ width / 2 },${ height / 2 })`)
  .selectAll('text')
  .data(pieArcs)
  .join('text')
  .attr('d', labelArc)
  .attr('transform', d => `translate(${ labelArc.centroid(d) })`)
  .attr('text-anchor', 'middle')


text
  .selectAll('tspan')
  .data( d => [
    d.data.type,
    d.data.value.toFixed(1) + ' kg'
  ])
  .join('tspan')
  .attr('x', 0)
  .style('font-family', 'sans-serif')
  .style('font-size', 12)
  .style('font-weight', (d,i) => i ? undefined : 'bold')
  .style('fill', '#222')
  //3
  .attr('dy', (d,i) => i ? '1.2em' : 0 )
  .text(d => d)


