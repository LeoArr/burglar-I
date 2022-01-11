const Paint = require('../Paint')
const wallBasicSprite = require('../sprites/wallBasicSprite')

class WallBasicPaint extends Paint {
  constructor() {
    super({
      title: 'Wall Basic',
      type: 'WallBasic',
      sprite: wallBasicSprite()
    })
  }
}

module.exports = WallBasicPaint