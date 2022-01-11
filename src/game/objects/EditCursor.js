const GameObject = require("../GameObject");
const Sprite = require("../Sprite");

class EditCursor extends GameObject {
  constructor(game) {
    super({
      game,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 9, y: 14
      })
    })
  }

  update() {
    const mousePos = this.game.renderer.camera.screenCoordToCameraCoord(createVector(mouseX, mouseY))
    if (keyIsPressed && keyCode === 17) { //CTRL_LEFT
      this.position = createVector(mousePos.x, mousePos.y)
    } else {
      this.position = createVector(
        Math.floor(mousePos.x),
        Math.floor(mousePos.y)
      )
    }
  }
}

module.exports = EditCursor