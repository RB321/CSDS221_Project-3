const buttons = document.querySelectorAll(".button-option");
const popup = document.querySelector(".popup");
const newGameButton = document.getElementById("new-game");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");
const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]
];
let isXTurn = true;
let clickCount = 0;

const disableButtons = () => {
  buttons.forEach((button) => (button.disabled = true));
  popup.classList.remove("hide");
};

const enableButtons = () => {
  buttons.forEach((button) => {
    button.innerText = "";
    button.disabled = false;
  });
  popup.classList.add("hide");
  clickCount = 0;
};

const winFunction = (letter) => {
  disableButtons();
  message.innerHTML = letter + " Wins!";
};

const drawFunction = () => {
  disableButtons();
  message.innerHTML = "It's a Draw";
};

newGameButton.addEventListener("click", () => {
  enableButtons();
});

restartButton.addEventListener("click", () => {
  enableButtons();
});

const winChecker = () => {
  for (let i of winningPatterns) {
    let [element1, element2, element3] = [
      buttons[i[0]].innerText,
      buttons[i[1]].innerText,
      buttons[i[2]].innerText
    ];
    if (
      element1 &&
      element2 &&
      element3 &&
      element1 === element2 &&
      element2 === element3
    ) {
      winFunction(element1);
      break;
    }
  }

  if (clickCount === 9) {
    drawFunction();
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.innerText) {
      button.innerText = isXTurn ? "X" : "O";
      button.disabled = true;
      isXTurn = !isXTurn;
      clickCount++;
      winChecker();
    }
  });
});

enableButtons();
