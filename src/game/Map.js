const fs = require('fs')
const Player = require("./objects/Player")
const FloorBasic = require("./objects/world/FloorBasic")
const WallBasic = require("./objects/world/WallBasic")

class Map {
  constructor(game, mapData) {
    this.game = game
    this.mapData = mapData || require('./maps/default.json')
    this.objects = {}
    this.cachedObjectsArray = null
    this.populateObjects()
  }

  load(mapData) {
    this.mapData = mapData
    this.populateObjects()
    this.game.player = this.getObjectsArray()
      .find((o) => o.constructor.name === 'Player')
  }

  paintObject(paint, layer, position) {
    const data = {
      type: paint.constructor.name,
      x: position.x,
      y: position.y
    }
    if (!this.mapData[layer]) {
      this.mapData[layer] = []
    }
    this.mapData[layer].push(data)
    if (!this.objects[layer]) {
      this.objects[layer] = []
    }
    this.objects[layer].push(this.createObject(data))
    this.cachedObjectsArray = null
  }

  removeObject(object, currentLayer) {
    {
      const index = this.objects[currentLayer].indexOf(object)
      if (index > -1) {
        this.objects[currentLayer].splice(index, 1)
        this.cachedObjectsArray = null
      }
    }
    {
      const index = this.mapData[currentLayer]
        .findIndex((value) => value.type === object.constructor.name
          && value.x === object.position.x && value.y === object.position.y
        )
      if (index > -1) {
        this.mapData[currentLayer].splice(index, 1)
      }
    }
  }

  populateObjects() {
    this.cachedObjectsArray = null
    for (const layer of Object.keys(this.mapData)) {
      this.objects[layer] = this.mapData[layer].map((data) => this.createObject(data))
    }
  }

  getObjectsArray() {
    if (this.cachedObjectsArray) {
      return this.cachedObjectsArray
    }
    let result = []
    for (const layer of Object.keys(this.objects).sort()) {
      result = result.concat(this.objects[layer])
    }
    this.cachedObjectsArray = result
    return result
  }

  getObjectsAtPosition(position) {
    return this.getObjectsArray().filter((object) => object.getPosition().equals(position))
  }

  createObject(data) {
    switch(data.type) {
      case 'Player': {
        return new Player(this.game, createVector(data.x, data.y))
        break
      }
      default: {
        return new (require(`./objects/world/${data.type}.js`))(this.game, createVector(data.x, data.y), data.interactions)
      }
    }
  }
}

module.exports = Map