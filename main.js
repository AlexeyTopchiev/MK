import { player1, player2 } from "./players.js"
import { createElement } from "./utils.js"
import { $arenas, $formFight } from "./nodes.js"
import { enemyAttack, playerAttack, showResult } from "./fight.js"
import { generateLogs } from "./logs.js"

const createPlayer = playerObj => {
  const { player, hp, name, img } = playerObj

  const $player = createElement("div", `player${player}`)
  const $progressBar = createElement("div", "progressbar")
  const $character = createElement("div", "character")

  $player.appendChild($progressBar)
  $player.appendChild($character)

  const $life = createElement("div", "life")
  const $name = createElement("div", "name")

  $progressBar.appendChild($life)
  $progressBar.appendChild($name)

  const $img = createElement("img")
  $character.appendChild($img)

  $life.style.width = `${hp}%`
  $name.innerText = name
  $img.src = img

  return $player
}

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

generateLogs("start", player1, player2)

const handleHit = (player, damageValue) => {
  player.changeHP(damageValue)
  player.renderHP(player.elHP())
}

$formFight.addEventListener("submit", function(e) {
  e.preventDefault()
  const enemy = enemyAttack()
  const player = playerAttack()

  if (player.hit !== enemy.defence) {
    handleHit(player2, player.value)
    generateLogs("hit", player1, player2, player.value)
  } else {
    generateLogs("defence", player1, player2)
  }
  if (enemy.hit !== player.defence) {
    handleHit(player1, enemy.value)
    generateLogs("hit", player2, player1, enemy.value)
  } else {
    generateLogs("defence", player2, player1)
  }

  showResult()
})
