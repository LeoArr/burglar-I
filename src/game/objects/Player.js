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
    if (this.state === STATES.IDLE) {
      if (this.game.gameMode.state === GAME_STATES.PLAYER_TURN) {
        const turnTaken = keyIsPressed && this.keyPressed(keyCode)
        if (turnTaken) {
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
      }
    }
  }

  setNewTargetIfPossible(target) {
    const objectsAtTarget = this.game.map.getObjectsAtPosition(target)
    if (this.anyBlockingObject(objectsAtTarget)) {
      this.shakeFrame = 0
      this.state = STATES.SHAKING
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
    objects.forEach(o => o.interact())
    return !!objects.filter((o) => o.blocks).length
  }

  keyPressed(keyCode) {
    if (C.left()) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(-1, 0)))
    } else if (C.right()) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(1, 0)))
    } else if (C.up()) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(0, -1)))
    } else if (C.down()) {
      return this.setNewTargetIfPossible(this.targetPosition.copy().add(createVector(0, 1)))
    }
  }
}

module.exports = Player