const Paint = require('../Paint')
const floorBasicSprite = require('../sprites/floorBasicSprite')

class FloorBasicPaint extends Paint {
  constructor() {
    super({
      title: 'Floor Basic',
      type: 'FloorBasic',
      sprite: floorBasicSprite()
    })
  }
}

module.exports = FloorBasicPaint