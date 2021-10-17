const $arena = document.querySelector("div.arenas")
const $randomButton = document.querySelector(".button")

const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["katana", "kunai"],
  attack: function() {
    console.log(this.name + " Fight...")
  }
}

const player2 = {
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["axe", "chain"],
  attack: function() {
    console.log(this.name + " Fight...")
  }
}

function createElement(tag, className) {
  const $tag = document.createElement(tag)

  if (className) {
    $tag.classList.add(className)
  }

  return $tag
}

function createPlayer(playerObj) {
  const $player = createElement("div", `player${playerObj.player}`)
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

  $life.style.width = playerObj.hp + "%"
  $name.innerText = playerObj.name
  $img.src = playerObj.img

  return $player
}

function hitPlayers() {
  changeHP(player1)
  changeHP(player2)

  console.log("player1 hp:", player1.hp)
  console.log("player2 hp:", player2.hp)

  if (isDraw()) {
    console.log("draw")
    $arena.appendChild(endBattle("DRAW"))
  } else {
    let winner = hasWinner()
    console.log("winner is " + winner)
    if (winner) $arena.appendChild(endBattle(winner + " WINS"))
  }
}

function randomDamage() {
  return Math.ceil(Math.random() * 20)
}

function changeHP(player) {
  const playerLife = document.querySelector(`.player${player.player} .life`)
  player.hp -= randomDamage()
  playerLife.style.width = `${player.hp}%`

  if (player.hp <= 0) {
    player.hp = 0
    playerLife.style.width = `0%`
  }
}

function hasWinner() {
  if (player1.hp == 0) return player2.name
  if (player2.hp == 0) return player1.name
}

function isDraw() {
  return !player1.hp && !player2.hp
}

function endBattle(text) {
  const $title = createElement("div", "loseTitle")
  $title.innerText = text
  $randomButton.disabled = true
  return $title
}

$randomButton.addEventListener("click", () => {
  hitPlayers()
})

$arena.appendChild(createPlayer(player1))
$arena.appendChild(createPlayer(player2))
