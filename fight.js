import { HIT, ATTACK } from "./constants.js"
import { $formFight, $fightButton, $arenas } from "./nodes.js"
import { getRandom, createElement, createReloadButton } from "./utils.js"
import { player1, player2 } from "./player.js"
import { generateLogs } from "./logs.js"

export const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1]
  const defence = ATTACK[getRandom(3) - 1]

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
}

export const playerAttack = () => {
  const attack = {}

  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value])
      attack.hit = item.value
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value
    }

    item.checked = false
  }
  return attack
}

export const playerWins = name => {
  const $title = createElement("div", "loseTitle")
  if (name) {
    $title.innerText = `${name} wins`
  } else {
    $title.innerText = "draw"
  }

  return $title
}

export const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true
    $fightButton.style.display = "none"
    createReloadButton()
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name))
    generateLogs("end", player2, player1)
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name))
    generateLogs("end", player1, player2)
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins())
    generateLogs("draw")
  }
}
