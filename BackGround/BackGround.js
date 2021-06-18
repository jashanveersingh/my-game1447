import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BackGround extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level 1", "./BackGround/costumes/Level 1.svg", {
        x: 244.79912000000016,
        y: 213.21950999999999
      }),
      new Costume("Level 2", "./BackGround/costumes/Level 2.svg", {
        x: 260.6099633694259,
        y: 254.89425557106722
      }),
      new Costume("Level 3", "./BackGround/costumes/Level 3.svg", {
        x: 243.29762000000014,
        y: 256.21952
      }),
      new Costume("Level 4", "./BackGround/costumes/Level 4.svg", {
        x: 734.813215,
        y: 139.63323883530407
      }),
      new Costume("Level 5", "./BackGround/costumes/Level 5.svg", {
        x: 99.99554474495159,
        y: 152.21950999999996
      }),
      new Costume("Level 6", "./BackGround/costumes/Level 6.svg", {
        x: 99.99554474495159,
        y: 153.21951
      }),
      new Costume("Level 7", "./BackGround/costumes/Level 7.svg", {
        x: 99.99554499999999,
        y: 153.21951
      }),
      new Costume("Level 8", "./BackGround/costumes/Level 8.svg", {
        x: 99.99554474495159,
        y: 43.633239181250445
      }),
      new Costume("Level 9", "./BackGround/costumes/Level 9.svg", {
        x: 289.05320355785176,
        y: 277.2195
      }),
      new Costume("Level 10", "./BackGround/costumes/Level 10.svg", {
        x: 264.31174828619277,
        y: 251.21949999999998
      }),
      new Costume("Level 11", "./BackGround/costumes/Level 11.svg", {
        x: 116.42950210693633,
        y: 178.21952
      }),
      new Costume("Level 12", "./BackGround/costumes/Level 12.svg", {
        x: 99.99554474495159,
        y: 54.63323883530411
      }),
      new Costume("Level 13", "./BackGround/costumes/Level 13.svg", {
        x: 248.77736,
        y: 219.21952
      }),
      new Costume("Level 14", "./BackGround/costumes/Level 14.svg", {
        x: 244.79912000000027,
        y: 243.21952
      }),
      new Costume("Level 15", "./BackGround/costumes/Level 15.svg", {
        x: 275.429475,
        y: 350.21950000000004
      }),
      new Costume("Level 16", "./BackGround/costumes/Level 16.svg", {
        x: 98.11041583632849,
        y: 307.21950000000004
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
      new Trigger(
        Trigger.BROADCAST,
        { name: "Background " },
        this.whenIReceiveBackground2
      ),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd)
    ];

    this.vars.cloneXPos2 = 1542;
    this.vars.cloneYPos2 = -10;
  }

  *startAsClone() {
    while (true) {
      this.size = 400;
      this.goto(
        this.vars.cloneXPos2 - this.stage.vars.scrollX,
        this.vars.cloneYPos2 - this.stage.vars.scrollY
      );
      this.size = 100;
      yield;
    }
  }

  *whenIReceiveDeleteAll() {
    this.deleteThisClone();
  }

  *generateLandAtXYSwitchToCostume(x2, y2, costumeNumber2) {
    this.moveAhead();
    this.costume = costumeNumber2;
    this.vars.cloneXPos2 += x2;
    this.vars.cloneYPos2 += y2;
    this.createClone();
  }

  *whenIReceiveBackground() {
    this.visible = true;
    this.costume = "Level 1";
    this.vars.cloneXPos2 = 0;
    this.vars.cloneYPos2 = -300;
    this.createClone();
    yield* this.generateLandAtXYSwitchToCostume(302, 150, 2);
    yield* this.generateLandAtXYSwitchToCostume(300, 150, 3);
    yield* this.generateLandAtXYSwitchToCostume(800, 0, 4);
    yield* this.generateLandAtXYSwitchToCostume(0, 210, 5);
    yield* this.generateLandAtXYSwitchToCostume(-300, 180, 6);
    yield* this.generateLandAtXYSwitchToCostume(-300, 180, 7);
    yield* this.generateLandAtXYSwitchToCostume(300, 100, 8);
    yield* this.generateLandAtXYSwitchToCostume(500, 100, 9);
    yield* this.generateLandAtXYSwitchToCostume(400, 0, 10);
    yield* this.generateLandAtXYSwitchToCostume(400, -100, 11);
    yield* this.generateLandAtXYSwitchToCostume(300, -100, 12);
    yield* this.generateLandAtXYSwitchToCostume(400, -200, 13);
    yield* this.generateLandAtXYSwitchToCostume(1202, 0, 14);
    yield* this.generateLandAtXYSwitchToCostume(500, -500, 15);
    this.visible = false;
  }

  *whenIReceiveBackground2() {
    this.visible = true;
    this.costume = "Level 1";
    this.vars.cloneXPos2 = 0;
    this.vars.cloneYPos2 = -300;
    yield* this.generateLandAtXYSwitchToCostume(1542, 290, 16);
    this.visible = false;
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
