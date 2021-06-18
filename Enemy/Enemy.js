import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level type : 1", "./Enemy/costumes/Level type : 1.svg", {
        x: 21.599999999999994,
        y: 21.599999999999994
      }),
      new Costume("Level type : 2", "./Enemy/costumes/Level type : 2.svg", {
        x: 21.60000000000005,
        y: 40.69062500000001
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
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Delete all" },
        this.whenIReceiveDeleteAll
      ),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd)
    ];

    this.vars.cloneXPos3 = 4875;
    this.vars.cloneYPos3 = -25;
    this.vars.steps = 25;
    this.vars.speed = 4;
  }

  *startAsClone() {
    this.moveAhead();
    while (true) {
      this.stage.vars.move = 0;
      for (let i = 0; i < 25; i++) {
        this.vars.cloneXPos3 += 4;
        this.goto(
          this.vars.cloneXPos3 - this.stage.vars.scrollX,
          this.vars.cloneYPos3 - this.stage.vars.scrollY
        );
        yield;
      }
      for (let i = 0; i < 25; i++) {
        this.vars.cloneXPos3 += -4;
        this.goto(
          this.vars.cloneXPos3 - this.stage.vars.scrollX,
          this.vars.cloneYPos3 - this.stage.vars.scrollY
        );
        yield;
      }
      yield;
    }
  }

  *generateLandAtXYSwitchToCostume(x3, y3, costumeNumber3) {
    this.costume = costumeNumber3;
    this.vars.cloneXPos3 += x3;
    this.vars.cloneYPos3 += y3;
    this.createClone();
  }

  *whenIReceiveBackground() {
    this.visible = true;
    this.costume = "Level type : 1";
    this.vars.cloneXPos3 = 235;
    this.vars.cloneYPos3 = -45;
    this.vars.steps = 25;
    this.vars.speed = 4;
    this.createClone();
    yield* this.generateLandAtXYSwitchToCostume(650, 150, 2);
    yield* this.generateLandAtXYSwitchToCostume(90, 0, 2);
    yield* this.generateLandAtXYSwitchToCostume(450, 770, 1);
    yield* this.generateLandAtXYSwitchToCostume(460, 19, 2);
    yield* this.generateLandAtXYSwitchToCostume(460, -156, 1);
    yield* this.generateLandAtXYSwitchToCostume(600, -263, 1);
    yield* this.generateLandAtXYSwitchToCostume(430, 0, 2);
    yield* this.generateLandAtXYSwitchToCostume(1500, -500, 1);
    this.visible = false;
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Player"].andClones())) {
        if (this.sprites["Player"].y - 10 > this.y) {
          this.broadcast("Bounce");
          for (let i = 0; i < 10; i++) {
            this.effects.ghost += 10;
            yield;
          }
          this.deleteThisClone();
        } else {
          this.stage.vars.death = "True";
        }
      }
      yield;
    }
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
