const createButton = (className, eventName, eventHandler) => {
  const $button = document.createElement("button");
  $button.className = className;
  $button.addEventListener(eventName, eventHandler);
  return $button;
};

window.onload = () => {
  const $root = document.getElementById("root");
  const $actionInput = document.getElementById("action");

  $root.append(
    createButton("attack-button", "click", (e) => {
      const move = $actionInput.value;
      console.log(move);
      // Run fight function
    })
  );

  $root.append(createButton("ability-button", "click", (e) => {}));

  $root.append(createButton("end-turn", "click", (e) => {}));
};
