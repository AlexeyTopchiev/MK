import { player1, player2 } from "./players.js"
import { createElement } from "./utils.js"
import { $arenas, $formFight } from "./nodes.js"
import { enemyAttack, playerAttack, showResult } from "./fight.js"
import { generateLogs } from "./logs.js"

const createPlayer = ({ player, hp, name, img }) => {
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
  const player = playerAttack()
  const enemy = enemyAttack()

  const { hit, defence, value } = player
  const { hit: enemyHit, defence: enemyDefence, value: enemyValue } = enemy

  if (hit !== enemyDefence) {
    handleHit(player2, value)
    generateLogs("hit", player1, player2, value)
  } else {
    generateLogs("defence", player1, player2)
  }
  if (enemyHit !== defence) {
    handleHit(player1, enemyValue)
    generateLogs("hit", player2, player1, enemyValue)
  } else {
    generateLogs("defence", player2, player1)
  }

  showResult()
})
