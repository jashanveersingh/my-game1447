import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class YouWin extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./YouWin/costumes/costume1.svg", {
        x: 245.5368758723529,
        y: 165.47621824773
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveEnd() {
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.effects.ghost = 100;
  }
}
