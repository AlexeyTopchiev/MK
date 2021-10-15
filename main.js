const player1 = {
  name: "SCORPION",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["katana", "kunai"],
  attack: function() {
    console.log(this.name + " Fight...")
  }
}

const player2 = {
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["axe", "chain"],
  attack: function() {
    console.log(this.name + " Fight...")
  }
}

function createPlayer(className, playerObj) {
  const $player = document.createElement("div")
  $player.classList.add(className)

  const $progressBar = document.createElement("div")
  $progressBar.classList.add("progressbar")

  const $character = document.createElement("div")
  $character.classList.add("character")

  $player.appendChild($progressBar)
  $player.appendChild($character)

  const $life = document.createElement("div")
  $life.classList.add("life")

  const $name = document.createElement("div")
  $name.classList.add("name")

  $progressBar.appendChild($life)
  $progressBar.appendChild($name)

  const $img = document.createElement("img")
  $character.appendChild($img)

  $life.style.width = playerObj.hp + "%"
  $name.innerText = playerObj.name
  $img.src = playerObj.img

  const $arena = document.querySelector("div.arenas")
  $arena.appendChild($player)
}

createPlayer("player1", player1)
createPlayer("player2", player2)
