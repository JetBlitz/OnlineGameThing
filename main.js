const createButton = (className, eventName, buttonTitle, eventHandler) => {
  const $button = document.createElement("button");
  $button.className = className;
  $button.innerText = buttonTitle;
  $button.addEventListener(eventName, eventHandler);
  return $button;
};

window.onload = () => {
  const updateInfoText = () => {
    // console.log(players);
    $attackerName.innerText = players[currentPlayer].name;
    $attackerStats.innerText = `
      HP: ${players[currentPlayer].health}
      MP: ${players[currentPlayer].mana}
      Block: ${players[currentPlayer].currentBlock}
      Strength (bonus dmg): ${players[currentPlayer].str}
      Temp Strength: ${players[currentPlayer].tempStr}
      Dexterity (bonus block): ${players[currentPlayer].dex}
      Temp Dexterity: ${players[currentPlayer].tempDex}
    `;
    $defenderName.innerText = players[nextPlayer].name;
    $defenderStats.innerText = `
      HP: ${players[nextPlayer].health}
      MP: ${players[nextPlayer].mana}
      Block: ${players[nextPlayer].currentBlock}
      Strength (bonus dmg): ${players[nextPlayer].str}
      Temp Strength: ${players[nextPlayer].tempStr}
      Dexterity (bonus block): ${players[nextPlayer].dex}
      Temp Dexterity: ${players[nextPlayer].tempDex}
    `;
    if ($actionInput.value.length > 0) {
      $actionText.innerText = `You ${$actionInput.value} ${$defenderName.innerText} for ${players[0].getDmg()
        } damage`
    } else {
      $actionText.innerText = `${players[currentPlayer].name}'s turn`
    }
    console.log($actionInput.value.length)
  };

  const playerAttribs = [
    {
      name: "Jet",
      health: 100,
      mana: 100,
      recover: {
        hp: 5,
        mp: 5,
      },
      actions: 2,
      dmg: 20,
      blockAmount: 15,
      currentBlock: 0,
      attacks: ["punch", "kick", "uppercut"],
      abilities: ["recover", "block", "flex", "focus"],
      str: 0,
      dex: 0,
      tempStr: 0,
      tempDex: 0,
      vulnerable: false,
      weak: false,
      frail: false,
    },
    {
      name: "Faetheon",
      health: 100,
      mana: 100,
      recover: {
        hp: 5,
        mp: 5,
      },
      actions: 2,
      dmg: 20,
      blockAmount: 15,
      currentBlock: 0,
      attacks: ["punch", "kick", "uppercut"],
      abilities: ["recover", "block", "flex", "focus"],
      str: 0,
      dex: 0,
      tempStr: 0,
      tempDex: 0,
      vulnerable: false,
      weak: false,
      frail: false,
    },
  ];
  window.players = playerAttribs.map((stats) =>
    new Player(stats).assignStats()
  );
  let currentPlayer = 0;
  let nextPlayer = 1;
  // updateInfoText.bind(this);

  const $root = document.getElementById("root");
  const $actionInput = document.getElementById("action");
  const $attackerName = document.getElementById("attacker");
  const $attackerStats = document.getElementById("attacker-stats");
  const $defenderName = document.getElementById("defender");
  const $defenderStats = document.getElementById("defender-stats");
  const $actionText = document.getElementById("action-text");
  updateInfoText();

  $root.append(
    createButton("attack-button", "click", "Attack", (e) => {
      const attack = $actionInput.value;
      // console.log(attack);
      const attacker = players[currentPlayer];
      const defender = players[nextPlayer];
      let dmgAndBlock;
      if (attacker.actions > 0) {
        dmgAndBlock = attacker.useAttack(attack);
        if (Array.isArray(dmgAndBlock)) {
          // console.log(dmgAndBlock);
          if (defender.currentBlock > 0) {
            if (dmgAndBlock[0] - defender.currentBlock > 0) {
              dmgAndBlock[0] -= defender.currentBlock;
              defender.currentBlock = 0;
            } else {
              defender.currentBlock -= dmgAndBlock[0];
            }
          }
          defender.health -= dmgAndBlock[0];
          attacker.currentBlock += dmgAndBlock[1];
          updateInfoText();
        } else {
          alert(dmgAndBlock);
        }
      } else if (attacker.actions <= 0) {
        alert("Out of actions, please end your turn.");
      }
    })
  );

  $root.append(
    createButton("ability-button", "click", "Ability", (e) => {
      const attacker = players[currentPlayer];
      const defender = players[nextPlayer];
    })
  );

  $root.append(
    createButton("end-turn", "click", "End turn", (e) => {
      const attacker = players[currentPlayer];
      const defender = players[nextPlayer];
      if (defender.health <= 0) {
        alert(`${attacker.name} wins!`);
      } else if (attacker.actions > 0) {
        alert("You still have actions left.");
      } else {
        $actionInput.value = '';
        attacker.actions += 2;
        currentPlayer ^= nextPlayer;
        nextPlayer ^= currentPlayer;
        currentPlayer ^= nextPlayer;
        updateInfoText();
      }
    })
  );
};

// attackPlayer = (attack) => {
//   currentPlayer = 0;
//   playerTarget = 1;
//   let dmgAndBlock = this.useAttack(attack);
//   players[currentPlayer].block += dmgAndBlock[1];
//   players[playerTarget].health -= dmgAndBlock[0];
// };
