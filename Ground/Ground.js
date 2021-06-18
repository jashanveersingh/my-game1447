import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level type : 1", "./Ground/costumes/Level type : 1.svg", {
        x: 238.5,
        y: 83.00000000000014
      }),
      new Costume("Level type : 2", "./Ground/costumes/Level type : 2.svg", {
        x: 93.814405,
        y: 44.84660664819944
      }),
      new Costume("Level type : 3", "./Ground/costumes/Level type : 3.svg", {
        x: 93.81440499999997,
        y: 22.053668711911314
      }),
      new Costume("Level type : 4", "./Ground/costumes/Level type : 4.svg", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Background " },
        this.whenIReceiveBackground
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Delete all" },
        this.whenIReceiveDeleteAll
      ),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd)
    ];

    this.vars.cloneXPos = 4802;
    this.vars.cloneYPos = -130;
  }

  *startAsClone() {
    while (true) {
      this.moveBehind();
      this.visible = true;
      this.size = 400;
      this.goto(
        this.vars.cloneXPos - this.stage.vars.scrollX,
        this.vars.cloneYPos - this.stage.vars.scrollY
      );
      this.size = 100;
      yield;
    }
  }

  *generateLandAtXYSwitchToCostume(x, y, costumeNumber) {
    this.costume = costumeNumber;
    this.vars.cloneXPos += x;
    this.vars.cloneYPos += y;
    this.createClone();
  }

  *whenIReceiveBackground() {
    this.visible = true;
    this.costume = "Level type : 1";
    this.vars.cloneXPos = 0;
    this.vars.cloneYPos = -300;
    this.createClone();
    yield* this.generateLandAtXYSwitchToCostume(302, 150, 1);
    yield* this.generateLandAtXYSwitchToCostume(300, 150, 1);
    yield* this.generateLandAtXYSwitchToCostume(800, 0, 1);
    yield* this.generateLandAtXYSwitchToCostume(0, 210, 2);
    yield* this.generateLandAtXYSwitchToCostume(-300, 180, 2);
    yield* this.generateLandAtXYSwitchToCostume(-300, 180, 2);
    yield* this.generateLandAtXYSwitchToCostume(300, 100, 3);
    yield* this.generateLandAtXYSwitchToCostume(500, 100, 1);
    yield* this.generateLandAtXYSwitchToCostume(400, 0, 1);
    yield* this.generateLandAtXYSwitchToCostume(400, -100, 2);
    yield* this.generateLandAtXYSwitchToCostume(300, -100, 3);
    yield* this.generateLandAtXYSwitchToCostume(400, -200, 1);
    yield* this.generateLandAtXYSwitchToCostume(400, 0, 4);
    yield* this.generateLandAtXYSwitchToCostume(400, 0, 4);
    yield* this.generateLandAtXYSwitchToCostume(400, 0, 1);
    yield* this.generateLandAtXYSwitchToCostume(500, -500, 1);
    this.visible = false;
  }

  *whenIReceiveDeleteAll() {
    this.deleteThisClone();
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.visible = false;
    return;
  }
}
