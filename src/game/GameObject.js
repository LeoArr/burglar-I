class GameObject {
  constructor({ game, position, sprite, interactions }) {
    this.game = game
    this.position = position || createVector(0, 0)
    this.sprite = sprite
    this.interactions = interactions || []
  }

  interact() {
    if (this.interactions.length) {
      this.game.gameMode.events = this.game.gameMode.events.concat(this.interactions)
      return true
    }
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