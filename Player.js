/*
    name: String;
    health: Number;
    mana: Number;
    recover: {
      hp: Number;
      mp: Number;
    }
    moves: Number;
    dmg: Number;
    block: Number;
    actions: Array<String>;
    abilities: Array<String>;
    str: Number;
    dex: Number;
    tempStr: Number;
    tempDex: Number;
    vulnerable: Boolean;
    weak: Boolean;
    frail: Boolean;

    {
      name: String,
      health: 100,
      mana: 100,
      recover: {
        hp: 5,
        mp: 5,
      }
      moves: 2,
      dmg: 20,
      block: 15,
      actions: ["punch", "kick", "uppercut"],
      abilities: ["recover", "block", "flex", "focus"],
      str: 0,
      dex: 0,
      tempStr: 0,
      tempDex: 0,
      vulnerable: false,
      weak: false,
      frail: false,
    }
*/

class Player {
  constructor(attributes) {
    this.attributes = attributes;
  }

  assignStats = () => {
    const keys = Object.keys(this.attributes);
    for (let i = 0; i < keys.length; i++) {
      this[keys[i]] = this.attributes[keys[i]];
    }
    return this;
  };

  endTurn = () => {
    if (this.tempStr > 0) {
      this.tempStr = Math.ceil(this.tempStr / 2);
    }
    if (this.tempDex > 0) {
      this.tempDex = Math.ceil(this.tempDex / 2);
    }
  };

  getDmg = () => {
    return this.dmg + this.str + this.tempStr;
  };

  getBlock = () => {
    return this.blockAmount + this.dex + this.tempDex;
  };

  useAttack = (attack) => {
    if (attack === undefined) {
      return "Invalid attack";
    } else {
      let dmgAndBlock;
      switch (attack) {
        case "punch":
          dmgAndBlock = [this.getDmg() + Math.ceil(this.dmg / 2), 0];
          break;
        case "kick":
          dmgAndBlock = [this.getDmg(), this.getBlock()];
          break;
        case "uppercut":
          dmgAndBlock = [this.getDmg(), 0, "vulnerable"];
          break;
        default:
          dmgAndBlock = "Invalid move";
      }
      if (--this.actions === 0) {
        this.endTurn();
      }
      return dmgAndBlock;
    }
  };

  useAbility = (ability) => {
    if (ability === undefined) {
      return "Invalid ability";
    } else {
      if (--this.actions === 0) {
        this.endTurn();
      }
      let dmgAndBlock;
      switch (ability) {
        case "flex":
          this.tempStr += Math.floor(this.attack / 4);
          dmgAndBlock = "Strength up!";
          break;
        case "focus":
          this.tempDex += Math.floor(this.block / 4);
          dmgAndBlock = "Dexterity up!";
          break;
        case "block":
          dmgAndBlock = [0, this.getBlock() + Math.ceil(this.block / 2)];
          break;
        case "recover":
          dmgAndBlock = `Hp up! (${this.recover.hp}hp recovered) \n Mp up! (${this.recover.mp}mp recovered)`;
          this.health += this.recover.hp;
          this.mana += this.recover.mp;
        default:
          dmgAndBlock = "Invalid ability";
      }
      return dmgAndBlock;
    }
  };
}
