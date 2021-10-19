const $arena = document.querySelector(".arenas")
const $randomButton = document.querySelector(".button")

function elHP() {
  const $playerLife = document.querySelector(`.player${this.player} .life`)
  return $playerLife
}

function renderHP(lifeElement) {
  // this.elHP().style.width = this.hp + "%"
  lifeElement.style.width = this.hp + "%"
}

function changeHP(num) {
  if (this.hp <= 0) {
    this.hp = 0
  } else {
    this.hp -= num
  }
}

const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["katana", "kunai"],
  attack: function() {
    console.log(this.name + " Fight...")
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
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
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
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

function getRandomDamage(num) {
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
  const $reloadWrap = createElement("div", "reloadWrap")
  const $button = createElement("button", "button")
  $button.innerText = "Restart"
  $reloadWrap.appendChild($button)

  return $reloadWrap
}

$randomButton.addEventListener("click", () => {
  player1.changeHP(getRandomDamage(20))
  player1.renderHP(player1.elHP())
  player2.changeHP(getRandomDamage(20))
  player2.renderHP(player2.elHP())

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true
    $reloadButton = $arena.appendChild(createReloadButton())

    $reloadButton.addEventListener("click", function() {
      window.location.reload()
    })
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arena.appendChild(playerWins(player2.name))
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arena.appendChild(playerWins(player1.name))
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arena.appendChild(playerWins())
  }
})

$arena.appendChild(createPlayer(player1))
$arena.appendChild(createPlayer(player2))
