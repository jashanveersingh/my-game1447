import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Box extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Box/costumes/costume1.svg", {
        x: 257.75,
        y: 197.75
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd),
      new Trigger(Trigger.BROADCAST, { name: "Begin" }, this.whenIReceiveBegin)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.visible = false;
  }

  *whenIReceiveBegin() {
    this.visible = true;
    while (true) {
      this.moveAhead();
      this.effects.ghost = 0;
      yield;
    }
  }
}
