const GameObject = require("../../GameObject");
const GAME_STATES = require("../../gameStates");
const Sprite = require("../../Sprite");

const STATES = {
  IDLE: 'IDLE',
  SPRINGING: 'SPRINGING'
}

class BasicFloorTrap extends GameObject {
  constructor(game, position, interactions) {
    super({
      game,
      position,
      interactions,
      sprite: new Sprite({
        tileset: 'dungeonTiles', x: 3, y: 7
      })
    })
    this.framesPerAnimationStep = 3
    this.currentAnimationStep = 0
    this.xAnimStart = 3
    this.xAnimEnd = 7
    this.state = STATES.IDLE
  }

  update() {
    if (this.state === STATES.SPRINGING) {
      if (!(this.currentAnimationStep % this.framesPerAnimationStep)) {
        this.sprite.x += 1
        if (this.sprite.x === this.xAnimEnd) {
          this.state = STATES.IDLE
          this.game.gameMode.state = GAME_STATES.PLAYER_DEAD
        }
      }
      this.currentAnimationStep++
    }
  }

  springTrap(disarmedConditionName) {
    if (disarmedConditionName) {
      if (!this.game.gameMode.mapVariables[disarmedConditionName]) {
        this.state = STATES.SPRINGING
      }
    } else {
      this.state = STATES.SPRINGING
    }
  }
}

module.exports = BasicFloorTrap