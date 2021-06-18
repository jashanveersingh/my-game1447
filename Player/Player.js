import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Normal", "./Player/costumes/Normal.svg", {
        x: 21.60000000000005,
        y: 21.600000000000023
      }),
      new Costume("Right", "./Player/costumes/Right.svg", {
        x: 21.60000000000005,
        y: 21.600000000000023
      }),
      new Costume("Left", "./Player/costumes/Left.svg", {
        x: 21.60000000000008,
        y: 21.600000000000023
      }),
      new Costume("Up", "./Player/costumes/Up.svg", {
        x: 21.599999999999966,
        y: 21.600000000000136
      }),
      new Costume("Up-Right", "./Player/costumes/Up-Right.svg", {
        x: 21.599999999999966,
        y: 21.600000000000136
      }),
      new Costume("Up-Left", "./Player/costumes/Up-Left.svg", {
        x: 21.60000000000005,
        y: 21.60000000000008
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Begin" }, this.whenIReceiveBegin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bounce" },
        this.whenIReceiveBounce
      ),
      new Trigger(Trigger.BROADCAST, { name: "Begin" }, this.whenIReceiveBegin2)
    ];

    this.vars.xSpd = 0;
    this.vars.ySpd = 0;
    this.vars.onGround = 1;
    this.vars.doubleJump = 1;
  }

  *xColl() {
    this.x += this.vars.xSpd;
    if (this.touching(this.sprites["Ground"].andClones())) {
      this.vars.xSpd = 0;
    }
    this.x = 0;
    this.stage.vars.scrollX += this.x;
  }

  *yColl(movingUp) {
    while (!!this.touching(this.sprites["Ground"].andClones())) {
      if (movingUp) {
        this.y += -2;
      } else {
        this.y += 2;
        this.vars.onGround = 1;
        this.vars.doubleJump = 0;
      }
      this.vars.ySpd = 0;
    }
    if (
      (this.keyPressed("up arrow") || this.keyPressed("w")) &&
      this.vars.onGround == 1
    ) {
      this.vars.ySpd = 21;
    }
    if (
      (this.keyPressed("up arrow") || this.keyPressed("w")) &&
      this.vars.doubleJump == 1
    ) {
      this.vars.ySpd = 21;
      this.vars.doubleJump = 2;
    }
    if (
      !(this.keyPressed("up arrow") || this.keyPressed("w")) &&
      this.vars.doubleJump == 0
    ) {
      this.vars.doubleJump = 1;
    }
    this.stage.vars.scrollY += this.y;
    this.y = 0;
  }

  *physics() {
    this.moveAhead();
    this.costume = "costume";
    if (this.keyPressed("right arrow") || this.keyPressed("d")) {
      this.vars.xSpd += 2;
    }
    if (this.keyPressed("left arrow") || this.keyPressed("a")) {
      this.vars.xSpd += -2;
    }
    this.warp(this.xColl)();
    this.vars.xSpd = this.vars.xSpd * 0.8;
    this.stage.vars.scrollX += this.vars.xSpd;
    this.vars.ySpd += -2;
    this.vars.onGround = 0;
    this.y += this.vars.ySpd;
    this.warp(this.yColl)(this.vars.ySpd > 0);
    if (
      this.touching(Color.rgb(204, 0, 0)) ||
      this.touching(Color.rgb(166, 0, 0))
    ) {
      this.stage.vars.death = "True";
    }
    if (this.stage.vars.scrollY < -500) {
      this.stage.vars.death = "True";
    }
    if (this.touching(this.sprites["Water"].andClones())) {
      this.vars.xSpd = 9;
      this.vars.ySpd = 3;
      if (this.keyPressed("up arrow")) {
        this.vars.ySpd = 14;
      }
    }
    if (!this.keyPressed("any")) {
      this.costume = "Normal";
    }
    if (this.keyPressed("up arrow")) {
      this.costume = "Up";
    }
    if (this.keyPressed("right arrow")) {
      this.costume = "Right";
    }
    if (this.keyPressed("left arrow")) {
      this.costume = "Left";
    }
    if (this.keyPressed("up arrow") && this.keyPressed("right arrow")) {
      this.costume = "Up-Right";
    }
    if (this.keyPressed("up arrow") && this.keyPressed("left arrow")) {
      this.costume = "Up-Left";
    }
  }

  *whenIReceiveBegin() {
    yield* this.reset();
    while (true) {
      while (!(this.stage.vars.death == "True")) {
        yield* this.physics();
        yield;
      }
      yield* this.die();
      yield;
    }
  }

  *reset() {
    this.visible = true;
    this.effects.ghost = 0;
    this.x = 0;
    this.y = 0;
    this.stage.vars.scrollY = 0;
    this.vars.ySpd = 0;
    this.stage.vars.scrollX = 0;
    this.vars.xSpd = 0;
    this.stage.vars.death = "False";
  }

  *die() {
    this.stage.vars.death = "False";
    for (let i = 0; i < 3; i++) {
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += 20;
        yield;
      }
      for (let i = 0; i < 5; i++) {
        this.effects.ghost += -20;
        yield;
      }
      yield;
    }
    this.broadcast("Delete all");
    this.broadcast("Begin");
    this.broadcast("Background ");
    yield* this.reset();
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveBounce() {
    this.vars.ySpd = 15;
  }

  *whenIReceiveBegin2() {
    while (true) {
      if (this.touching(Color.rgb(255, 126, 126))) {
        this.broadcast("End");
        /* TODO: Implement stop other scripts in sprite */ null;
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += 10;
          yield;
        }
        this.visible = false;
        return;
      }
      yield;
    }
  }
}
