const GAME_STATES = require("./gameStates")

class GameMode {
  constructor(game) {
    this.game = game
    this.state = GAME_STATES.PLAYER_TURN
  }

  tick(dt) {
    clear()
    background(0)
    const objects = this.game.map.getObjectsArray()
    if (!this.game.renderer.doneLoading) return
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
  }
}

module.exports = GameMode