const { ipcRenderer } = require('electron')
const GAME_STATES = require('./gameStates')
const Renderer = require('./Renderer')
const GameMode = require('./GameMode')
const Player = require('./objects/Player')
const Map = require('./Map')

class Game {
  constructor() {
    this.map = new Map(this, require('./maps/map01.json'))
    this.player = this.map.getObjectsArray().find((object) => object instanceof Player)
    if (!this.player) console.error('No player found in map')
    this.renderer = new Renderer(this)
    this.gameMode = new GameMode(this)
    this.editMode = null
    this.pressedKeys = {}
  }
  
  init() {
    frameRate(30)
    noSmooth()
    this.renderer.loadAssets()
  }

  tick(dt) {
    if (this.editMode) {
      this.editMode.tick(dt)
    } else {
      this.gameMode.tick(dt)
    }
    this.pressedKeys = {}
  }

  mouseClicked(event) {
    if (this.editMode) {
      this.editMode.mouseClicked(event)
    } else {
      this.gameMode.mouseClicked(event)
    }
  }
  
  keyPressed() {
    // https://keycode.info/
    if (keyCode === ESCAPE) {
      ipcRenderer.send('game-quit')
    } else if (keyCode === 220) { // §
      ipcRenderer.send('toggle-dev-tools')
    } else if (keyCode === 187) { // +
      this.renderer.camera.scaleValue += 1
    } else if (keyCode === 189) { // -
      this.renderer.camera.scaleValue = Math.max(this.renderer.camera.scaleValue - 1, 1)
    } else {
      this.pressedKeys[keyCode] = true
      if (this.editMode) {
        this.editMode.keyPressed()
      } else {
        this.gameMode.keyPressed()
      }
    }
  }

  resize() {
    this.gameMode.resize()
  }
}

module.exports = Game