import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Water extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Water/costumes/1.svg", {
        x: 759.3459810210211,
        y: 105.97672999999992
      }),
      new Costume("12", "./Water/costumes/12.svg", {
        x: 759.34598,
        y: 105.97672999999992
      }),
      new Costume("2", "./Water/costumes/2.svg", {
        x: 729.3159499999999,
        y: 105.97672999999989
      }),
      new Costume("13", "./Water/costumes/13.svg", {
        x: 729.3159499999999,
        y: 105.97672999999989
      }),
      new Costume("3", "./Water/costumes/3.svg", {
        x: 699.2859000000001,
        y: 105.97672999999995
      }),
      new Costume("14", "./Water/costumes/14.svg", {
        x: 699.28592,
        y: 105.97672999999986
      }),
      new Costume("4", "./Water/costumes/4.svg", {
        x: 666.25286,
        y: 105.97672999999983
      }),
      new Costume("15", "./Water/costumes/15.svg", {
        x: 666.25286,
        y: 105.97672999999983
      }),
      new Costume("5", "./Water/costumes/5.svg", {
        x: 619.70633,
        y: 105.9767299999998
      }),
      new Costume("16", "./Water/costumes/16.svg", {
        x: 619.70633,
        y: 105.9767299999998
      }),
      new Costume("6", "./Water/costumes/6.svg", {
        x: 582.16879,
        y: 105.97672999999978
      }),
      new Costume("17", "./Water/costumes/17.svg", {
        x: 582.16879,
        y: 105.97672999999978
      }),
      new Costume("7", "./Water/costumes/7.svg", {
        x: 537.12373,
        y: 105.97672999999975
      }),
      new Costume("18", "./Water/costumes/18.svg", {
        x: 537.12373,
        y: 105.97672999999975
      }),
      new Costume("8", "./Water/costumes/8.svg", {
        x: 490.57721000000004,
        y: 105.97672999999972
      }),
      new Costume("19", "./Water/costumes/19.svg", {
        x: 490.57721000000004,
        y: 105.97672999999972
      }),
      new Costume("9", "./Water/costumes/9.svg", {
        x: 448.53515,
        y: 105.97672999999969
      }),
      new Costume("20", "./Water/costumes/20.svg", {
        x: 448.53515,
        y: 105.97672999999969
      }),
      new Costume("10", "./Water/costumes/10.svg", {
        x: 406.49311,
        y: 105.97672999999966
      }),
      new Costume("21", "./Water/costumes/21.svg", {
        x: 406.49311,
        y: 105.97672999999966
      }),
      new Costume("11", "./Water/costumes/11.svg", {
        x: 334.42103,
        y: 105.97672999999963
      }),
      new Costume("22", "./Water/costumes/22.svg", {
        x: 334.42105,
        y: 105.97673
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Delete all" },
        this.whenIReceiveDeleteAll
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Background " },
        this.whenIReceiveBackground
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd)
    ];

    this.vars.cloneXPos4 = 3900;
    this.vars.cloneYPos4 = 370;
  }

  *startAsClone() {
    while (true) {
      this.costumeNumber += 1;
      this.size = 400;
      this.goto(
        this.vars.cloneXPos4 - this.stage.vars.scrollX,
        this.vars.cloneYPos4 - this.stage.vars.scrollY
      );
      this.size = 100;
      yield;
    }
  }

  *whenIReceiveDeleteAll() {
    this.deleteThisClone();
  }

  *generateLandAtXY(x4, y4) {
    this.vars.cloneXPos4 += x4;
    this.vars.cloneYPos4 += y4;
    this.createClone();
  }

  *whenIReceiveBackground() {
    this.visible = true;
    this.costume = 1;
    this.vars.cloneXPos4 = 1000;
    this.vars.cloneYPos4 = 0;
    this.createClone();
    yield* this.generateLandAtXY(2400, 370);
    yield* this.generateLandAtXY(500, 0);
    this.visible = false;
  }

  *startAsClone2() {
    while (true) {
      this.moveBehind();
      yield;
    }
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
