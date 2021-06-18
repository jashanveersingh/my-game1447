import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 269.51952,
        y: 202.34029500000008
      })
    ];

    this.sounds = [
      new Sound("8-bit fnaf music", "./Stage/sounds/8-bit fnaf music.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Begin" }, this.whenIReceiveBegin),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];

    this.vars.scrollX = 0;
    this.vars.scrollY = -194;
    this.vars.move = 0;
    this.vars.death = "False";
    this.vars.timeTaken = 5;
    this.vars.WorldRecord = 26;
    this.vars.By = 0;
    this.vars.code = [];

    this.watchers.timeTaken = new Watcher({
      label: "Time Taken",
      style: "normal",
      visible: false,
      value: () => this.vars.timeTaken,
      x: 245,
      y: 175
    });
    this.watchers.WorldRecord = new Watcher({
      label: "☁ World Record",
      style: "normal",
      visible: false,
      value: () => this.vars.WorldRecord,
      x: 245,
      y: 148
    });
    this.watchers.By = new Watcher({
      label: "☁ by",
      style: "normal",
      visible: false,
      value: () => this.vars.By,
      x: 245,
      y: 122
    });
  }

  *whenIReceiveBegin() {
    this.vars.timeTaken = 0;
    while (true) {
      this.vars.timeTaken += 1;
      yield* this.wait(1);
      yield;
    }
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.watchers.timeTaken.visible = true;
    this.watchers.By.visible = true;
    this.watchers.WorldRecord.visible = true;
    while (true) {
      if (this.vars.timeTaken < this.vars.WorldRecord) {
        this.vars.WorldRecord = this.vars.timeTaken;
        this.vars.By = /* no username */ "";
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.watchers.By.visible = false;
    this.watchers.WorldRecord.visible = false;
    this.watchers.timeTaken.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.playSoundUntilDone("8-bit fnaf music");
      yield;
    }
  }
}
