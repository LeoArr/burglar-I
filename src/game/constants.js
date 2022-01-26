const constants = {
  TILE_WIDTH: 16,
  TILE_HEIGHT: 16,
  left: (game) => game.pressedKeys[LEFT_ARROW],
  right: (game) => game.pressedKeys[RIGHT_ARROW],
  down: (game) => game.pressedKeys[DOWN_ARROW],
  up: (game) => game.pressedKeys[UP_ARROW],
  interact: () => keyIsPressed && (keyCode === SPACE || key === 'e')
}

module.exports = constants