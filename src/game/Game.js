const { ipcRenderer } = require('electron')
const GAME_STATES = require('./gameStates')
const Renderer = require('./Renderer')
const GameMode = require('./GameMode')
const EditMode = require('./EditMode')
const Map = require('./Map')
const Player = require('./objects/Player')

class Game {
  constructor() {
    this.map = new Map(this)
    this.player = this.map.getObjectsArray().find((object) => object instanceof Player)
    if (!this.player) console.error('No player found in map')
    this.renderer = new Renderer(this)
    this.gameMode = new GameMode(this)
    this.editMode = new EditMode(this)
    this.isEditMode = false
  }
  
  init() {
    frameRate(30)
    noSmooth()
    this.renderer.loadAssets()
  }

  tick(dt) {
    if (this.isEditMode) {
      this.editMode.tick(dt)
    } else {
      this.gameMode.tick(dt)
    }
  }

  mouseClicked(event) {
    if (this.isEditMode) {
      this.editMode.mouseClicked(event)
    }
  }
  
  keyPressed() {
    // https://keycode.info/
    if (keyCode === ESCAPE) {
      ipcRenderer.send('game-quit')
    } else if (keyCode === 220) { // §
      ipcRenderer.send('toggle-dev-tools')
    } else {
      if (this.isEditMode) {
        this.editMode.keyPressed()
      }
    }
  }
}

module.exports = Game