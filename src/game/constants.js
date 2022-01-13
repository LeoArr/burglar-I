const constants = {
  TILE_WIDTH: 16,
  TILE_HEIGHT: 16,
  left: () => keyIsPressed && (keyCode === LEFT_ARROW || key === 'a'),
  right: () => keyIsPressed && (keyCode === RIGHT_ARROW || key === 'd'),
  down: () => keyIsPressed && (keyCode === DOWN_ARROW || key === 's'),
  up: () => keyIsPressed && (keyCode === UP_ARROW || key === 'w'),
  interact: () => keyIsPressed && (keyCode === SPACE || key === 'e')
}

module.exports = constants