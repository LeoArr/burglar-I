const { TILE_WIDTH } = require('./constants')
const C = require('./constants')
const GAME_STATES = require("./gameStates")

const STATES = {
  START_OPEN: 'START_OPEN',
  MOVING: 'MOVING',
  DRAWING_TEXT: 'DRAWING_TEXT',
  IDLE: 'IDLE'
}

const WIDTH = 50

class DialogBox {
  constructor(game, text) {
    this.game = game
    this.gameModePrevState = this.game.gameMode.state
    this.game.gameMode.state = GAME_STATES.DIALOG
    this.texts = text.split(' ¤ ')
    this.textIndex = 0

    this.font = this.game.renderer.fonts['alagard']
    this.calcParams()
    
    this.position = createVector(0, windowHeight)
    this.targetPos = createVector(0, windowHeight - this.height)
    this.maxPositionStep = 10
    this.positionStep = 0
    this.state = STATES.START_OPEN
    this.displayText = ''
    this.lettersShown = 0
  }

  updateAndDraw() {
    this.update()
    this.draw()
  }

  calcParams() {
    // 4:1
    this.width = Math.min(windowWidth, C.TILE_WIDTH * WIDTH)
    this.height = Math.floor(this.width / 4)
    this.edge = 5
    this.rowHeight = this.height * 0.4 - this.edge
    this.xPos = (windowWidth - this.width) / 2
    this.targetPos = createVector(0, windowHeight - this.height)
    this.position = this.targetPos.copy()
  }

  resize() {
    this.calcParams()
  }

  update() {
    if (this.state === STATES.START_OPEN) {
      this.positionStep = 0
      this.position = createVector(0, windowHeight)
      this.targetPos = createVector(0, windowHeight - this.height)
      this.state = STATES.MOVING
    } else if (this.state === STATES.MOVING) {
      this.position.lerp(this.targetPos, ++this.positionStep / this.maxPositionStep)
      if (this.positionStep === this.maxPositionStep) {
        if (this.textIndex === this.texts.length) {
          // Done
          this.game.gameMode.dialogBox = null
          this.game.gameMode.state = this.gameModePrevState
          this.game.gameMode.currentEvent = null
        } else {
          this.state = STATES.DRAWING_TEXT
          this.lettersShown = 0
        }
      }
    } else if (this.state === STATES.DRAWING_TEXT) {
      this.displayText = this.texts[this.textIndex].substring(0, ++this.lettersShown)
      if (this.lettersShown === this.texts[this.textIndex].length) {
        this.state = STATES.IDLE
      }
    }
  }

  nextLine() {
    if (this.state === STATES.IDLE) {
      if (++this.textIndex === this.texts.length) {
        this.targetPos = createVector(0, windowHeight)
        this.positionStep = 0
        this.state = STATES.MOVING
      } else {
        this.state = STATES.DRAWING_TEXT
        this.lettersShown = 0
      }
    }
  }

  draw() {
    noStroke()
    fill(color(49, 46, 61))
    rect(
      this.xPos,
      this.position.y,
      this.width,
      this.height
    )
    textFont(this.font)
    fill(color(126, 59, 50))
    textSize(this.rowHeight)
    text(
      this.displayText,
      this.xPos + this.edge,
      this.position.y + this.edge,
      this.width - this.edge,
      this.height - this.edge
    )
    if (this.state === STATES.IDLE) {
      fill(color(255, 255, 255))
      rect(0, windowHeight - 10, windowWidth, 10)
    }
  }
}

module.exports = DialogBox