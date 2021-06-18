import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Ground from "./Ground/Ground.js";
import BackGround from "./BackGround/BackGround.js";
import Enemy from "./Enemy/Enemy.js";
import Box from "./Box/Box.js";
import Water from "./Water/Water.js";
import YouWin from "./YouWin/YouWin.js";
import Backstory from "./Backstory/Backstory.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 7
  }),
  Ground: new Ground({
    x: 5.001687096282771,
    y: 7,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  BackGround: new BackGround({
    x: -0.2814116507210862,
    y: -49.67071989642423,
    direction: 90,
    costumeNumber: 16,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Enemy: new Enemy({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Box: new Box({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8
  }),
  Water: new Water({
    x: 62.816989474955335,
    y: 36.0910307446742,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  YouWin: new YouWin({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Backstory: new Backstory({
    x: -2,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
