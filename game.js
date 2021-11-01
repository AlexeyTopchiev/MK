import { getRandom } from "./utils.js"
import { $arenas, $formFight } from "./nodes.js"
import { playerAttack, showResult } from "./fight.js"
import { generateLogs } from "./logs.js"
import { Player } from "./player.js"

export let player1
export let player2

class Game {
  getPlayers = async () => {
    const body = fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then(res => res.json())

    return body
  }

  getRandomEnemy = async () => {
    const body = fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then(res => res.json())

    return body
  }

  handleHit = async () => {
    const { hit, defence } = playerAttack()
    const body = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/fight",
      {
        method: "POST",
        body: JSON.stringify({
          hit,
          defence
        })
      }
    ).then(res => res.json())

    return body
  }

  start = async () => {
    const players = await this.getPlayers()
    console.log("###players:", players)
    // const p1 = players[getRandom(players.length - 1)]
    const p1 = JSON.parse(localStorage.getItem("player1"))
    const p2 = await this.getRandomEnemy()

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: "arenas"
    })

    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: "arenas"
    })

    $arenas.appendChild(player1.createPlayer())
    $arenas.appendChild(player2.createPlayer())

    generateLogs("start", player1, player2)

    this.handleFightSubmit()
  }

  handleFightSubmit = () => {
    $formFight.addEventListener("submit", async e => {
      e.preventDefault()

      const {
        player1: { hit, defence, value },
        player2: { hit: enemyHit, defence: enemyDefence, value: enemyValue }
      } = await this.handleHit()

      if (hit !== enemyDefence) {
        player2.changeHP(value)
        player2.renderHP()
        generateLogs("hit", player1, player2, value)
      } else {
        generateLogs("defence", player1, player2)
      }
      if (enemyHit !== defence) {
        player1.changeHP(enemyValue)
        player1.renderHP()
        generateLogs("hit", player2, player1, enemyValue)
      } else {
        generateLogs("defence", player2, player1)
      }

      showResult()
    })
  }
}

export default Game
