const C = require('./constants')
const EditCursor = require("./objects/EditCursor")
const PAINTS = require('./paints')

const STATES = {
  PAINTING: 'PAINTING',
  ENTERING_LAYER: 'ENTERING_LAYER',
  CHOOSING_PAINT: 'CHOOSING_PAINT'
}

const ROW_HEIGHT = 15


class EditMode {
  constructor(game) {
    this.game = game
    this.UNIT = this.game.renderer.camera.scaleValue * C.TILE_WIDTH
    this.cursor = new EditCursor(game)
    this.currentPaint = null
    this.state = STATES.PAINTING
    this.currentLayer = 0
    this.paints = PAINTS.map((paint) => new (require(`./paints/${paint}`))())
  }

  tick(dt) {
    clear()
    background(0)
    this.handleCamera()
    this.game.map.getObjectsArray().forEach((gameObject) => {
      gameObject.draw()
    })
    this.handleChoosePaint()
    this.handleCursor()
    this.drawBorder()
    this.drawStatusText()
  }

  handleChoosePaint() {
    if (this.state !== STATES.CHOOSING_PAINT) return
    noStroke()
    fill(color(0, 0, 0, 90))
    rect(0, 0, windowWidth, windowHeight)
    this.paints.forEach((paint, index) => {
      const pos = this.getPaintPosition(index)
      paint.sprite.drawAbsolute(this.game.renderer, pos)
      if (this.getPaintUnderMouse() === index) {
        fill(color(0, 255, 0))
      } else {
        fill(color(255, 255, 0))
      }
      text(paint.title, pos.x, pos.y + this.UNIT * 1.3)
    })
  }

  getPaintPosition(index) {
    const maxWidth = Math.max(
      Math.floor(windowWidth / (this.UNIT * 2)) - 1,
      0
    )
    return createVector(
      this.UNIT + Math.floor(index % maxWidth) * this.UNIT * 2,
      this.UNIT + (this.UNIT * 2) * Math.floor(index / maxWidth)
    )
  }

  getPaintUnderMouse() {
    const maxWidth = Math.max(
      Math.floor(windowWidth / (this.UNIT * 2)) - 1,
      0
    )
    const x = Math.floor((mouseX - this.UNIT) / (this.UNIT * 2))
    const y = Math.floor((mouseY - this.UNIT) / (this.UNIT * 2))
    return x + y * maxWidth
  }

  keyPressed() {
    if (key === 'c') {
      this.currentPaint = null
    }
    if (key === 'l') {
      if (this.state === STATES.ENTERING_LAYER) {
        this.state = STATES.PAINTING
        this.currentLayer = Number(this.currentLayer)
      } else {
        this.state = STATES.ENTERING_LAYER
        this.currentLayer = String(this.currentLayer)
      }
    }
    if (key === 'p') {
      if (this.state === STATES.PAINTING) {
        this.state = STATES.CHOOSING_PAINT
      } else if (this.state === STATES.CHOOSING_PAINT) {
        this.state = STATES.PAINTING
      }
    }
    if (this.state === STATES.ENTERING_LAYER) {
      if (/\d+/.test(key)) {
        this.currentLayer += key
      } else if (keyCode === 8) {
        this.currentLayer = this.currentLayer.slice(0, -1)
      } else if (keyCode === 13) {
        this.state = STATES.PAINTING
        this.currentLayer = Number(this.currentLayer)
      }
    }
  }

  drawStatusText() {
    textSize(12)
    noStroke()
    fill(color(255, 255, 0))
    text(`(P)aint: ${this.currentPaint ? this.currentPaint.title : 'None'} (C)lear`, 5, windowHeight - ROW_HEIGHT)

    if (this.state === STATES.PAINTING || this.state === STATES.ENTERING_LAYER) {
      if (this.state === STATES.PAINTING) {
        fill(color(255, 255, 0))
      } else {
        fill(color(0, 255, 0))
      }
      text(`(L)ayer: ${this.currentLayer}`, 5, windowHeight - ROW_HEIGHT * 2)
    }
  }

  handleCamera() {
    if (!this.isChoosingPaint && keyIsPressed) {
      if (keyCode === LEFT_ARROW || key === 'a') {
        this.game.renderer.camera.position.add(createVector(-1, 0))
      } else if (keyCode === RIGHT_ARROW || key === 'd') {
        this.game.renderer.camera.position.add(createVector(1, 0))
      } else if (keyCode === DOWN_ARROW || key === 's') {
        this.game.renderer.camera.position.add(createVector(0, 1))
      } else if (keyCode === UP_ARROW || key === 'w') {
        this.game.renderer.camera.position.add(createVector(0, -1))
      }
    }
  }

  mouseClicked() {
    if (this.state === STATES.PAINTING && this.currentPaint) {
      this.game.map.paintObject(this.currentPaint, this.currentLayer, this.cursor.position)
    } else if (this.state === STATES.CHOOSING_PAINT) {
      const index = this.getPaintUnderMouse()
      if (index >= 0 && index < this.paints.length) {
        this.currentPaint = this.paints[index]
      }
    }
  }

  handleCursor() {
    if (this.state !== STATES.CHOOSING_PAINT) {
      this.cursor.update()
      this.drawPaint()
      this.cursor.draw()
    }

    fill(color(255, 0, 0, 90))
    noStroke()
    circle(mouseX, mouseY, 10)
  }

  drawPaint() {
    if (!this.currentPaint) return
    tint(255, 255, 255, 100)
    this.currentPaint.sprite.draw(this.game.renderer, this.cursor.position)
    tint(255, 255, 255, 255)
  }

  drawBorder() {
    noFill()
    stroke(color(0, 200, 40))
    rect(0, 0, windowWidth, windowHeight)
    strokeWeight(3)
  }
}

module.exports = EditMode