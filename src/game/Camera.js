const C = require('./constants')

class Camera {
  constructor(game, position) {
    this.game = game
    this.position = position
    this.scaleValue = 4
    this.playerOffset = createVector(-8 * this.scaleValue, -10 * this.scaleValue)
  }

  toCameraCoord(coord) {
    return coord
      .copy()
      .mult(C.TILE_WIDTH * this.scaleValue)
      .sub(this.position.copy().mult(C.TILE_WIDTH * this.scaleValue))
      .add(createVector(windowWidth / 2, windowHeight / 2))
      .add(this.playerOffset)
    }
    // 1.496 & 2.018144
    screenCoordToCameraCoord(coord) {
      return coord
      .copy()
      .sub(this.playerOffset)
      .sub(createVector(windowWidth/2, windowHeight/2))
      .div(C.TILE_WIDTH * this.scaleValue)
      .add(this.position)
  }
}

module.exports = Camera