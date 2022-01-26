const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

const STATES = {
  UP: 'UP',
  MOVING: 'MOVING',
  DOWN: 'DOWN',
}

class LeverBasic extends GameObject {
  constructor(game, position, interactions) {
    super({
      game,
      position,
      interactions,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 15,
        y: 12,
      })
    })
    this.blocks = true
    this.state = STATES.UP
    this.prevState = STATES.UP
    this.maxAnimationSteps = 5
    this.currentAnimationStep = 0
  }

  update() {
    if (this.state === STATES.MOVING) {
      this.sprite.x = 16
      this.currentAnimationStep++
      if (this.currentAnimationStep === this.maxAnimationSteps) {
        this.currentAnimationStep = 0
        if (this.prevState === STATES.UP) {
          this.state = STATES.DOWN
          this.sprite.x = 17
        } else {
          this.state = STATES.UP
          this.sprite.x = 15
        }
      }
    }
  }

  toggle(conditionName) {
    this.game.gameMode.mapVariables[conditionName] = !Boolean(this.game.gameMode.mapVariables[conditionName])
    this.prevState = this.state
    this.state = STATES.MOVING
  }
}

module.exports = LeverBasic