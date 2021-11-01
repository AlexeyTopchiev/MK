import { createElement } from "./utils.js"

export class Player {
  constructor(props) {
    this.player = props.player
    this.name = props.name
    this.hp = props.hp
    this.img = props.img
  }

  createPlayer = () => {
    const $player = createElement("div", `player${this.player}`)
    const $progressBar = createElement("div", "progressbar")
    const $character = createElement("div", "character")

    $player.appendChild($progressBar)
    $player.appendChild($character)

    const $life = createElement("div", "life")
    const $name = createElement("div", "name")
    const $hp = createElement("div", "hp")

    $progressBar.appendChild($life)
    $progressBar.appendChild($name)
    $progressBar.appendChild($hp)

    const $img = createElement("img")
    $character.appendChild($img)

    $life.style.width = `${this.hp}%`
    $name.innerText = this.name
    $img.src = this.img
    $hp.innerText = this.hp

    return $player
  }

  changeHP = num => {
    this.hp -= num

    if (this.hp < 0) {
      this.hp = 0
    }
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`
    this.counterHp().innerText = this.hp
  }

  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`)
    return $playerLife
  }

  counterHp = () => {
    const $hpValue = document.querySelector(`.player${this.player} .hp`)
    return $hpValue
  }
}
