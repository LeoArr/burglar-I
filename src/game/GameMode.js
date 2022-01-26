const DialogBox = require("./DialogBox")
const GAME_STATES = require("./gameStates")

const BLOCKING_STATES = [
  GAME_STATES.DIALOG,
]

class GameMode {
  constructor(game) {
    this.game = game
    this.state = GAME_STATES.PLAYER_TURN
    this.mapVariables = this.game.map.getMapVariables()
    this.dialogBox = null
    this.currentEvent = null
    this.events = []
  }

  tick(dt) {
    background(0)
    if (!this.game.renderer.doneLoading) return

    this.handleEvents()
    
    const objects = this.game.map.getObjectsArray()

    if (!BLOCKING_STATES.includes(this.state)) {
      objects.forEach((gameObject) => {
        gameObject.update()
      })
    }

    this.game.renderer.camera.position = this.game.player.getPosition()
    
    if (this.state === GAME_STATES.PLAYER_TURN_DONE) {
      this.state = GAME_STATES.PLAYER_TURN
    }
    
    objects.forEach((gameObject) => {
      gameObject.draw()
    })

    if (this.state === GAME_STATES.DIALOG && this.dialogBox) {
      this.dialogBox.updateAndDraw()
    }
  }

  keyPressed() {
    if (this.state === GAME_STATES.DIALOG) {
      this.dialogBox.nextLine()
    }
  }

  mouseClicked(event) {

  }

  resize() {
    if (this.dialogBox) {
      this.dialogBox.resize()
    }
  }

  handleEvents() {
    if (this.currentEvent) return
    this.currentEvent = this.events.shift()
    if (this.currentEvent) {
      if (this.currentEvent.type === 'text') {
        this.dialogBox = new DialogBox(this.game, this.currentEvent.text)
      } else if (this.currentEvent.type === 'function') {
        this.currentEvent.owner[this.currentEvent.name](...this.currentEvent.arguments)
        this.currentEvent = null
      }
    }
  }
}

module.exports = GameMode