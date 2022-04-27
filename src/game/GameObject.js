class GameObject {
  constructor({ game, position, sprite, interactions }) {
    this.game = game
    this.position = position || createVector(0, 0)
    this.sprite = sprite
    this.interactions = interactions ? interactions.map(this.createInteractable(this)) : []
  }

  interact() {
    if (this.interactions.length) {
      this.game.gameMode.addEvents(this.interactions)
      return true
    }
    return false
  }

  createInteractable(owner) {
    return (interactionData) => {
      return {
        ...interactionData,
        owner
      }
    }
  }

  draw() {
    this.sprite.draw(this.game.renderer, this.position)
  }
  
  update() { }

  getPosition() {
    return this.position.copy()
  }

  remove() {
    this.game.map.removeObject(this, this.currentLayer)
  }
}

module.exports = GameObject