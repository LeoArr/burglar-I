const { ipcRenderer } = require('electron')
const EditMode = require('./game/EditMode')
const Game = require('./game/Game')
let game = null

ipcRenderer.on('map-loaded', (event, mapData) => {
  game.map.load(mapData)
})

function setup() {
  createCanvas(windowWidth, windowHeight)
  game = new Game()
  game.init()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  if (game) {
    game.resize()
  }
}

function draw(dt) {
  game.tick(dt)
}

function keyPressed() {
  game.keyPressed()
  return false // Prevent default behaviour
}

function keyReleased() {
  return false // Prevent default behaviour
}

function mouseClicked(event) {
  game.mouseClicked(event)
  return false // Prevent default behaviour
}

function toggleEditMode() {
  if (game.editMode) {
    game.editMode = null
  } else {
    game.editMode = new EditMode(game)
    game.editMode.cursor.position = game.player.getPosition()
  }
}