const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");
const Door = require("../baseItem/Door");

class DoorBasicBarred extends Door {
  constructor(game, position, interactions) {
    super(
      game,
      position,
      interactions,
      new Sprite({
        tileset: 'dungeonTiles',
        x: 9, y: 12
      }),
      true,
      "This door is locked",
      ["rusty"]
    )
  }
}

module.exports = DoorBasicBarred