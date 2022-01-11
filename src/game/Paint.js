class Paint {
  constructor({ title, type, sprite }) {
    this.title = title
    this.type = type
    this.sprite = sprite
  }

  getData(position) {
    return {
      type: this.type,
      x: position.x,
      y: position.y
    }
  }
}

module.exports = Paint