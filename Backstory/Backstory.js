import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Backstory extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Backstory/costumes/costume1.svg", {
        x: 242.79912000000004,
        y: 160.33166844604494
      }),
      new Costume("costume2", "./Backstory/costumes/costume2.svg", {
        x: 317.5163426354227,
        y: 171.44998732971192
      }),
      new Costume("costume3", "./Backstory/costumes/costume3.svg", {
        x: 317.5163425451409,
        y: 154.4499861444092
      }),
      new Costume("costume4", "./Backstory/costumes/costume4.svg", {
        x: 317.5163451805636,
        y: 155.28123689458153
      }),
      new Costume("costume5", "./Backstory/costumes/costume5.svg", {
        x: 242.7991051805636,
        y: 134.99635504089355
      }),
      new Costume("costume6", "./Backstory/costumes/costume6.svg", {
        x: 183.95356515672174,
        y: 162.99634847412108
      }),
      new Costume("costume7", "./Backstory/costumes/costume7.svg", {
        x: 242.7991051805636,
        y: 146.9963473297119
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.costume = "costume1";
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
    while (true) {
      if (this.keyPressed("right arrow")) {
        this.costumeNumber += 1;
        yield* this.wait(0.5);
      }
      if (this.keyPressed("s")) {
        this.broadcast("Begin");
        this.broadcast("Background ");
        this.visible = false;
        return;
      }
      yield;
    }
  }
}
