import { $chat } from "./nodes.js"
import { getRandom, getNormalizeTime } from "./utils.js"
import { LOGS } from "./constants.js"

export const generateLogs = (
  type,
  { name } = {},
  { name: playerName2, hp } = {},
  damage
) => {
  let text
  let el
  let time
  const date = new Date()
  switch (type) {
    case "hit":
      time = `${getNormalizeTime(date.getHours())}:${getNormalizeTime(
        date.getMinutes()
      )}`
      text = LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerKick]", name)
        .replace("[playerDefence]", playerName2)
      el = `<p>${time} - ${text} -${damage} [${hp}/100]</p>`
      break
    case "defence":
      time = `${getNormalizeTime(date.getHours())}:${getNormalizeTime(
        date.getMinutes()
      )}`
      text = LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerKick]", name)
        .replace("[playerDefence]", playerName2)
      el = `<p>${time} - ${text}</p>`
      break
    case "start":
      time = `${getNormalizeTime(date.getHours())}:${getNormalizeTime(
        date.getMinutes()
      )}`
      text = LOGS[type]
        .replace("[time]", time)
        .replace("[player1]", name)
        .replace("[player2]", playerName2)
      el = `<p>${text}</p>`
      break
    case "end":
      text = LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerWins]", name)
        .replace("[playerLose]", playerName2)
      el = `<p>${text}</p>`
      break
    case "draw":
      text = LOGS[type]
      el = `<p>${text}</p>`
      break
  }
  $chat.insertAdjacentHTML("afterbegin", el)
}
