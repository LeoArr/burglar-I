const DialogBox = require("./DialogBox")
const GAME_STATES = require("./gameStates")

class GameMode {
  constructor(game) {
    this.game = game
    this.state = GAME_STATES.PLAYER_TURN
    this.dialogBox = null
    this.currentEvent = null
    this.events = []
  }

  tick(dt) {
    clear()
    background(0)
    if (!this.game.renderer.doneLoading) return

    this.handleEvents()
    
    const objects = this.game.map.getObjectsArray()

    objects.forEach((gameObject) => {
      gameObject.update()
    })

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
      }
    }
  }
}

module.exports = GameMode