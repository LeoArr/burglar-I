const C = require('../constants')
const GameObject = require("../GameObject");
const GAME_STATES = require('../gameStates');
const Sprite = require("../Sprite");

const STATES = {
  IDLE: 'IDLE',
  MOVING: 'MOVING',
  SHAKING: 'SHAKING'
}

class Player extends GameObject {
  constructor(game, position) {
    super({
      game, position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        tileHeight: 2,
        tileWidth: 2,
        x: 12, y: 11,
        offset: createVector(-0.5, -1.4)
      })
    })
    this.offset = createVector(-0.5, -1.4)
    this.state = STATES.IDLE
    this.targetPosition = this.position.copy()
    this.maxMoveFrames = 10
    this.moveFrame = 0
    this.maxShakeFrames = 10
    this.shakeFrame = 0
  }

  update() {
    if (this.game.gameMode.state === GAME_STATES.PLAYER_DEAD)
      return
    if (this.state === STATES.IDLE) {
      if (this.game.gameMode.state === GAME_STATES.PLAYER_TURN) {
        if (this.keyPressed(keyCode)) {
          this.game.gameMode.state = GAME_STATES.WAITING
        }
      }
    }

    if (this.state === STATES.SHAKING) { // TODO Shake direction match movement direction
      const amount = Math.sin((++this.shakeFrame / this.maxShakeFrames) * (Math.PI * 2)) / 10
      this.sprite.offset = this.offset.copy().add(createVector(amount, 0))
      if (this.shakeFrame === this.maxShakeFrames) {
        this.state = STATES.IDLE
        this.sprite.offset = this.offset.copy()
      }
    }
    
    if (this.state === STATES.MOVING) {
      if (this.position.equals(this.targetPosition)) {
        this.game.gameMode.state = GAME_STATES.PLAYER_TURN_DONE
        this.state = STATES.IDLE
      } else {
        this.position.lerp(this.targetPosition, this.moveFrame++ / this.maxMoveFrames)
        this.position = createVector(
          this.clean(this.position.x),
          this.clean(this.position.y)
        )
      }
    }
  }

  clean(num) {
    return Number((Math.round(num * 100) / 100).toFixed(2))
  }

  interactWithOthers(objects) {
    return objects.map(o => o.interact()).some(result => result)
  }

  setNewTargetIfPossible(target) {
    const objectsAtTarget = this.game.map.getObjectsAtPosition(target)
    const interaction = this.interactWithOthers(objectsAtTarget)
    if (this.anyBlockingObject(objectsAtTarget)) {
      if (!interaction) {
        this.shakeFrame = 0
        this.state = STATES.SHAKING
      }
    } else {
      this.targetPosition = target
      this.moveFrame = 0
      this.state = STATES.MOVING
      return true
    }
    return false
  }

  anyBlockingObject(objects) {
    if (!objects.length)
      return true
    return !!objects.filter((o) => o.blocks).length
  }

  keyPressed(keyCode) {
    if (C.left(this.game)) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(-1, 0)))
    } else if (C.right(this.game)) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(1, 0)))
    } else if (C.up(this.game)) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(0, -1)))
    } else if (C.down(this.game)) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(0, 1)))
    }
  }
}

module.exports = Player