class GameObject {
  constructor({ game, position, sprite }) {
    this.game = game
    this.position = position || createVector(0, 0)
    this.sprite = sprite
  }

  draw() {
    this.sprite.draw(this.game.renderer, this.position)
  }
  
  update() { }

  getPosition() {
    return this.position.copy()
  }
}

module.exports = GameObject