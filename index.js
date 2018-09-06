document.addEventListener('DOMContentLoaded', init)

const BASE_URL = `https://swapi.co/api`
let body = document.querySelector('body')

function init() {
  let inputDiv = document.createElement('div')
  inputDiv.id = 'input-div'

  let ep4Button = document.createElement('button')
  ep4Button.innerText = 'Opening Crawl for Episode 4'
  ep4Button.addEventListener('click', getCrawl)

  let displayDiv = document.createElement('div')
  displayDiv.id = 'display-div'

  let numberForm = document.createElement('form')
  let numberInput = document.createElement('input')
  let numberSubmit = document.createElement('button')
  numberSubmit.innerText = 'Submit'
  numberSubmit.setAttribute('type', 'submit')
  numberInput.id = 'select-planet'
  numberInput.setAttribute('type', 'number')
  numberInput.setAttribute('max', '60')
  numberInput.setAttribute('placeholder', 'Select a planet')
  numberInput.setAttribute('min', '0')
  numberForm.addEventListener('submit', getPlanet)

  body.appendChild(inputDiv)
  body.appendChild(displayDiv)
  inputDiv.appendChild(ep4Button)
  inputDiv.appendChild(numberForm)
  numberForm.appendChild(numberInput)
  numberForm.appendChild(numberSubmit)

  getDroids()
}

function getDroids() {
  fetch(`${BASE_URL}/people/2/`)
  .then(response => response.json())
  .then(r2Data => renderDroid(r2Data))

  fetch(`${BASE_URL}/people/3/`)
  .then(response => response.json())
  .then(c3Data => renderDroid(c3Data))
}

function renderDroid(data) {
  let show = document.getElementById('display-div')
  let name = document.createElement('h3')
  let height = document.createElement('p')
  let mass = document.createElement('p')
  let moreButton = document.createElement('button')
  name.innerHTML = `${data.name}`
  height.innerHTML = `Height: ${data.height}`
  mass.innerHTML = `Mass: ${data.mass}`
  moreButton.innerText = 'Show Homeworld Details'
  moreButton.dataset.homeworld = `${data.homeworld.split('/')[5]}`
  moreButton.addEventListener('click', getHomeworld)
  show.appendChild(name)
  show.appendChild(height)
  show.appendChild(mass)
  show.appendChild(moreButton)
}

function getHomeworld(event) {
  let homeId = event.target.dataset.homeworld

  fetch(`${BASE_URL}/planets/${homeId}/`)
  .then(response => response.json())
  .then(data => renderPlanet(data))
}

function getPlanet(event) {
  event.preventDefault()

  let input = event.target[0].value

  fetch(`${BASE_URL}/planets/${input}/`)
  .then(response => response.json())
  .then(data => renderPlanet(data))

  document.getElementById('display-div').innerHTML = ''
}

function renderPlanet(planetData) {
  let name = document.createElement('h3')
  name.innerText = `${planetData.name}`

  let climate = document.createElement('p')
  climate.innerText = `Climate: ${planetData.climate}`

  document.getElementById('display-div').appendChild(name)
  document.getElementById('display-div').appendChild(climate)
}

function getCrawl() {
  fetch(`${BASE_URL}/films/1/`)
  .then(response => response.json())
  .then(data => renderCrawl(data))

  document.getElementById('display-div').innerHTML = ''
}

function renderCrawl(filmData) {
  let crawl = document.createElement('p')
  crawl.innerText = filmData.opening_crawl

  document.getElementById('display-div').appendChild(crawl)
}
