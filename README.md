# Burglar I: The Jungle Temple

To install:
```
npm ci
```

To run:
```
npm run start
```

## How to play

Use arrow keys to move. Interact with objects by moving onto them.

Zoom in and out with `+` and `-` keys.

## How to build maps

### Editor

Open the `dev console` with the `§` key.
In the console type:
```
toggleEditMode()
```
This will set the game in edit mode and you can edit the current level. 

Load a existing map by pressing `O` and save the map by pressing `V`.

You can move the camera with the arrow keys.

To change layer to draw on hit the `L` key and then enter a number greater than zero. When done, hit the `enter` key to set the layer.

To select a pain hit the `P` key and use the mouse to select what yoy want to draw.

Then by clicking with the mouse you draw your paint at the mouse position on the selected layer.

Use the `C` key to unset the paint.

### Advanced objects

Advanced object such at interactables are created by opening the map file in a text editor and editing the data there.

#### Display a message
How to display a message:
``` json
{
  "type": "Door",
  "y": 0,
  "x": 0,
  "interactions": [
    {
      "type": "text",
      "text": "The burglar throws a final glance back ¤ Knowing that he must press on ahead. ¤ If by dawn his quest remains incomplete ¤ He is as good as dead."
    }
  ]
}
```
A mwssage can be split into parts that are displayed separately by adding a `" ¤ "` between parts.

#### Call Object Function

At map top-level:
``` json
"variables": {
  "leverIsPulled": false
}
```
On object:

``` json
{
  "type": "LeverBasic",
  "x": 3,
  "y": -5,
  "interactions": [
    {
      "type": "function",
      "name": "toggle", // Function on object
      "arguments": [
        "leverIsPulled" // Map variable
      ]
    }
  ]
}
```

Another example:
``` json
{
  "type": "BasicFloorTrap",
  "x": -5,
  "y": -7,
  "interactions": [
    {
      "type": "function",
      "name": "springTrap",
      "arguments": [
        "leverIsPulled"
      ]
    }
  ]
}
```