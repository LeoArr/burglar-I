const { ipcRenderer } = require('electron')
const GAME_STATES = require('./gameStates')
const Renderer = require('./Renderer')
const GameMode = require('./GameMode')
const EditMode = require('./EditMode')
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
    } else {
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