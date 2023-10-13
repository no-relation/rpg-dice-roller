const DICE = ["000", "004", "006", "008", "010", "012", "020", "100"];

let specialDiceDiv = document.createElement("div");

const randomNumbers = (lowestNum, highestNum) => {
  return Math.floor(Math.random() * highestNum) + lowestNum;
};

const singleDieHTML = (sides) => {
  const die = document.createElement("form");
  die.className = "input-group input-group-md col-md-auto die-form";
  die.type = "form";
  die.id = `${sides}form`;

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "btn-group btn-group-sm";
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary";
  submitButton.innerText = "ROLL";
  submitButton.id = `${sides}submit`;
  buttonGroup.appendChild(submitButton);
  const minusAndPlus = ["-", "+"];
  minusAndPlus.forEach((type) => {
    button = document.createElement("button");
    button.className = "btn btn-outline-secondary";
    button.type = "button";
    if (type === "-") {
      button.id = `${sides}minusOne`;
    } else {
      button.id = `${sides}plusOne`;
    }
    button.innerText = type;
    buttonGroup.appendChild(button);
  });

  die.appendChild(buttonGroup);
  die.innerHTML += `
        <input type="number" id='${sides}SideDieQuantity' name="quantity" class="form-control " value='1' disabled>
        <div class="input-group-append">
            <span class="input-group-text">d${parseInt(sides)} </span>
        </div>
    `;
  const secondLine = document.createElement("div");
  const total = document.createElement("h3");
  total.id = `${sides}SideTotal`;
  total.innerText = "Total: ";
  secondLine.appendChild(total);

  die.appendChild(secondLine);

  return die;
};

const render = () => {
  DICE.forEach((die) => {
    if (die !== "000") {
      const card = document.createElement("div");
      card.className = "card";
      card.style = "width: 18rem";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.appendChild(singleDieHTML(die));
      card.appendChild(cardBody);
      document.body.appendChild(card);
    }
  });

  document.body.appendChild(specialDiceDiv);

  addAllListeners();
  renderSpecialDieForm();
};

render();
