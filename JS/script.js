//elementy
const board = document.querySelector("#board");
const boxes = document.querySelectorAll(".grid_box");

const communication = document.querySelector("#communication");

//zmienne
let activePlayer = 1;

//klasy
class boxObj {
  constructor(status, char) {
    this.occupied = status;
    this.char = char;
  }
}

//tablice
let boxesObjects = new Array(9);

//kod
for (let i = 0; i < boxes.length; i++) {
  // Tworzymy obiekt, bo nie był stworzony wcześniej
  boxesObjects[i] = new boxObj(false, undefined);

  boxes[i].addEventListener("click", (e) => {
    //tu kod co jak kliknieto
    if (activePlayer === 1) {
      if (!isOccupied(i)) {
        funPlayX(i);
      }
    } else {
      if (!isOccupied(i)) {
        funPlayCircle(i);
      }
    }

    if (checkForWin("X")) {
      console.log("X wygrywa");
      winMessage("X");
      setTimeout(clearBoard, 2000);
    }
    if (checkForWin("O")) {
      console.log("O wygrywa");
      winMessage("O");
      setTimeout(clearBoard, 2000);
    }
  });
}

function funPlayX(boxIndex) {
  activePlayer = 2;

  // To zmienione bo nie ma sensu deklarować od nowa
  boxesObjects[boxIndex].occupied = true;
  boxesObjects[boxIndex].char = "X";
  boxes[boxIndex].innerHTML = "<p>X<p>";
}

function funPlayCircle(boxIndex) {
  activePlayer = 1;

  boxesObjects[boxIndex].occupied = true;
  boxesObjects[boxIndex].char = "O";
  boxes[boxIndex].innerHTML = "<p>O<p>";
}

function checkForWin(symbol) {
  //tutaj sprawdzac indexy

  if (
    // linia pozioma 1
    boxesObjects[0].char == symbol &&
    boxesObjects[1].char == symbol &&
    boxesObjects[2].char == symbol
  ) {
    return true;
  } else if (
    //linia pozioma 2
    boxesObjects[3].char == symbol &&
    boxesObjects[4].char == symbol &&
    boxesObjects[5].char == symbol
  ) {
    return true;
  } else if (
    boxesObjects[6].char == symbol &&
    boxesObjects[7].char == symbol &&
    boxesObjects[8].char == symbol
  ) {
    return true;
  } else if (
    // linia skośna 1
    boxesObjects[0].char == symbol &&
    boxesObjects[4].char == symbol &&
    boxesObjects[8].char == symbol
  ) {
    return true;
  } else if (
    //linia skośna 2
    boxesObjects[2].char == symbol &&
    boxesObjects[4].char == symbol &&
    boxesObjects[6].char == symbol
  ) {
    return true;
  } else if (
    //linia pionowa 1
    boxesObjects[0].char == symbol &&
    boxesObjects[3].char == symbol &&
    boxesObjects[6].char == symbol
  ) {
    return true;
  } else if (
    // linia pionowa 2
    boxesObjects[1].char == symbol &&
    boxesObjects[4].char == symbol &&
    boxesObjects[7].char == symbol
  ) {
    return true;
  } else if (
    //linia pion 3
    boxesObjects[2].char == symbol &&
    boxesObjects[5].char == symbol &&
    boxesObjects[8].char == symbol
  ) {
    return true;
  }

  return false;
}

// nwm czy jest jakiś większy sens tej funkcji szczerze
function isOccupied(boxIndex) {
  return boxesObjects[boxIndex].occupied;
}

function winMessage(symbol) {
  communication.style.display = "initial";
  communication.innerHTML = `<h2>${symbol} WYGRYWA !!</h2>`;
}

function clearBoard() {
  for (let a of boxesObjects) {
    a.char = undefined;
    a.occupied = false;
  }
  for (let a of boxes) {
    a.innerHTML = "<p></p>";
  }
  communication.innerHTML = " ";
  communication.style.display = "none";
}
