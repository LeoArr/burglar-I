const C = require('./constants')

class Sprite {
  constructor({ tileset, tileWidth, tileHeight, x, y, offset }) {
    this.tileset = tileset
    this.tileWidth = tileWidth || 1
    this.tileHeight = tileHeight || 1
    this.x = x || 0
    this.y = y || 0
    this.offset = offset || createVector()
  }

  draw(renderer, position) {
    renderer.draw(this, position)
  }

  drawAbsolute(renderer, position) {
    renderer.drawAbsolute(this, position)
  }
}

module.exports = Sprite