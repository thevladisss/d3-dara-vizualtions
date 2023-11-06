import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 *
 * @param {PointerEvent} event
 */

const players = [
  { id: 1, name: 'Player 1', score : 0 },
  { id: 2, name: 'Player 2', score : 0 },
  { id: 3, name: 'Player 3', score : 0 },
  { id: 4, name: 'Player 4', score : 0 },
  { id: 5, name: 'Player 5', score : 0 },
  { id:6 , name: 'Player 6', score : 0 },
  { id: 7, name: 'Player 7', score : 0 },
  { id: 8, name: 'Player 8', score : 0 },
  { id: 9, name: 'Player 9', score : 0 },
  { id: 10, name: 'Player 10', score : 0 },
  { id: 11, name: 'Player 11', score : 0 },
  { id: 12, name: 'Player 12', score : 0 },
]

document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', addScore))

let pendingClick = false
function addScore() {
  if (!pendingClick) {
    pendingClick = true
    const playerId = +String(this.textContent).trim().replace(/\D/g, '')
    const player = players.find(({id}) => id === playerId)

    player.score++
    drawScore()
    console.log(players)
    console.log(player)

    setTimeout(() => pendingClick = false, 250)
  }
}

const getSortedPlayers = () =>
  players.sort((a,b) => b.score - a.score).slice(0, 5)

function updateScore() {
  const randomIndex = Math.floor(Math.random() * (players.length - 1))

  const randomPlayer = players.find(p => p.id === randomIndex)

  randomPlayer.score++
}

const svg = d3
  .select('#container')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 700)


const drawScore = () => {
  const data = getSortedPlayers()

  console.log(data)

  svg.selectAll('g')
    .data(data, (p) => p.id)
    .join(
      (enter) => {
        enter.append('g')
          .attr('transform', (d, i) => `translate(${10},${350})`)
          .style('opacity', 0)
          .call(g => g
            .transition().duration(1000)
            .attr('transform', (d, i) => `translate(${10},${10 + i * 70})`)
            .style('opacity', 1)
          )
          .call(g =>
            g.append('rect')
              .attr('width', '100%')
              .attr('height', 50)
              .style('fill', (d, i) => {
                if (i == 0) return 'gold'
                else if (i == 1) return 'silver'
                else if (i == 2) return '#cd7f32'
                else return 'green'
              })
              .style('opacity', 0.8)
              .attr('rx', 3)
          )
          .call(g =>
            g.append('text')
              .attr('x', 5)
              .attr('dy', '1.2em')
              .style('font-size', 18)
              .style('font-family', 'sans-serif')
              .text(d => `${d.name} - ${d.score}`)
              .raise()
          )
      },
      (update) => {
        update.call(g => g
          .transition().duration(1000)
          .attr('transform', (d, i) => `translate(${10},${10 + i * 70})`)
        )
          .call(g => g.select('text')
            .text(d => `${d.name} - ${d.score}`)
          )
          .call(g => g.select('rect')
            .transition().duration(1000)
            .style('fill', (d, i) => {
              if (i == 0) return 'gold'
              else if (i == 1) return 'silver'
              else if (i == 2) return '#cd7f32'
              else return 'green'
            })
          )
      },
      (exit) => {
        exit
          .call(g =>
            g.transition().duration(1000)
              .attr('transform', (d, i) => `translate(${10},${350})`)
              .style('opacity', 0)
              .remove()
          )
      }
    )
}

drawScore()
