const Game = require('./game/Game')
let game = null

function setup() {
  createCanvas(windowWidth, windowHeight)
  game = new Game()
  game.init()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(dt) {
  game.tick(dt)
}

function keyPressed() {
  game.keyPressed()
  return false // Prevent default behaviour
}

function mouseClicked(event) {
  game.mouseClicked(event)
}

function toggleEditMode() {
  if (game) {
    game.isEditMode = !game.isEditMode
    game.editMode.cursor.position = game.player.getPosition()
  }
}