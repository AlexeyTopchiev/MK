import { $arenas } from "./nodes.js"

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag)

  if (className) {
    $tag.classList.add(className)
  }

  return $tag
}

export const createReloadButton = () => {
  const $reloadButtonDiv = createElement("div", "reloadWrap")
  const $reloadButton = createElement("button", "button")
  $reloadButton.innerText = "Restart"

  $reloadButton.addEventListener("click", () => {
    window.location.pathname = "index.html"
  })

  $reloadButtonDiv.appendChild($reloadButton)
  $arenas.appendChild($reloadButtonDiv)
}

export const getRandom = num => Math.ceil(Math.random() * num)

export const getNormalizeTime = num =>
  num.toString().length > 1 ? num : `0${num}`
