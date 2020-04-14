const createButton = (buttonTitle, eventName, className, eventHandler) => {
  const $button = document.createElement("button");
  $button.className = className;
  $button.innerText = buttonTitle;
  $button.addEventListener(eventName, eventHandler);
  return $button;
};

window.onload = () => {
  const updateInfoText = () => {
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
  // players.shuffle();

  let currentPlayer = 0;
  let nextPlayer = 1;

  const $root = document.getElementById("root");
  const $actionInput = document.getElementById("action");
  const $attackerName = document.getElementById("attacker");
  const $attackerStats = document.getElementById("attacker-stats");
  const $defenderName = document.getElementById("defender");
  const $defenderStats = document.getElementById("defender-stats");
  const $actionText = document.getElementById("action-text");
  const $resetMatch = document.getElementById("reset");
  updateInfoText();

  $root.append(
    createButton("Attack", "click", "attack-button", (e) => {
      const attack = $actionInput.value;
      const attacker = players[currentPlayer];
      const defender = players[nextPlayer];

      if (attacker.actions > 0) {
        let dmgAndBlock = attacker.useAttack(attack);
        if (Array.isArray(dmgAndBlock)) {
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
      if (defender.health <= 0) {
        alert(`${attacker.name} wins!`);
        const selection = confirm('Would you like to play again?')
        if (selection) {
          window.players = playerAttribs.map((stats) =>
            new Player(stats).assignStats()
          );
          // players.shuffle();
          updateInfoText();
        }
      }
    })
  );

  $root.append(
    createButton("Ability", "click", "ability-button", (e) => {
      const attacker = players[currentPlayer];
      const defender = players[nextPlayer];
    })
  );

  $root.append(
    createButton("End Turn", "click", "end-turn", (e) => {
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

  $root.append(createButton("Reset Match", "click", "reset-match", (e) => {
    window.players = playerAttribs.map((stats) =>
      new Player(stats).assignStats()
    );
    // players.shuffle();
    updateInfoText();
  }))
};

// attackPlayer = (attack) => {
//   currentPlayer = 0;
//   playerTarget = 1;
//   let dmgAndBlock = this.useAttack(attack);
//   players[currentPlayer].block += dmgAndBlock[1];
//   players[playerTarget].health -= dmgAndBlock[0];
// };
