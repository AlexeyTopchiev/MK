class Player {
  constructor(props) {
    this.player = props.player
    this.name = props.name
    this.hp = props.hp
    this.img = props.img
  }

  changeHP = num => {
    this.hp -= num

    if (this.hp < 0) {
      this.hp = 0
    }
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`
  }

  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`)
    return $playerLife
  }
}

export const player1 = new Player({
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif"
})

export const player2 = new Player({
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif"
})

console.log("player1:", player1)
console.log("player2:", player2)
