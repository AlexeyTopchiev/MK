const $arenas = document.querySelector(".arenas")
const $formFight = document.querySelector(".control")
const $fightButton = document.querySelector(".button")

const HIT = {
  head: 30,
  body: 25,
  foot: 20
}
const ATTACK = ["head", "body", "foot"]

const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["katana", "kunai"],
  attack: function() {
    console.log(this.name + " Fight...")
  },
  changeHP,
  elHP,
  renderHP
}

const player2 = {
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["axe", "chain"],
  attack: function() {
    console.log(this.name + " Fight...")
  },
  changeHP,
  elHP,
  renderHP
}

function elHP() {
  const $playerLife = document.querySelector(`.player${this.player} .life`)
  return $playerLife
}

function renderHP() {
  this.elHP().style.width = this.hp + "%"
}

function changeHP(num) {
  this.hp -= num

  if (this.hp < 0) {
    this.hp = 0
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

function getRandom(num) {
  return Math.ceil(Math.random() * num)
}

function playerWins(name) {
  const $title = createElement("div", "loseTitle")
  if (name) {
    $title.innerText = name + " wins"
  } else {
    $title.innerText = "draw"
  }

  return $title
}

function createReloadButton() {
  const $reloadButtonDiv = createElement("div", "reloadWrap")
  const $reloadButton = createElement("button", "button")
  $reloadButton.innerText = "Restart"

  $reloadButton.addEventListener("click", function() {
    window.location.reload()
  })

  $reloadButtonDiv.appendChild($reloadButton)
  $arenas.appendChild($reloadButtonDiv)
}

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1]
  const defence = ATTACK[getRandom(3) - 1]

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
}

function playerAttack() {
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

function handleHit(player, damageValue) {
  player.changeHP(damageValue)
  player.renderHP(player.elHP())
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true
    $fightButton.style.display = "none"
    createReloadButton()
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name))
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name))
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins())
  }
}

$formFight.addEventListener("submit", function(e) {
  e.preventDefault()
  const enemy = enemyAttack()
  const player = playerAttack()

  if (player.hit !== enemy.defence) {
    handleHit(player2, player.value)
  }
  if (enemy.hit !== player.defence) {
    handleHit(player1, enemy.value)
  }

  showResult()
})
