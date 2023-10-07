import { applyCellBehavior, restoreGameProgress } from '../reusableFunctions';
import { createCell } from './cell';

let matrix = [];

function setBombs(bombCount) {
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  const allIndices = [];
  for (let y = 0; y < matrixHeight; y++) {
    for (let x = 0; x < matrixWidth; x++) {
      allIndices.push({ x, y });
    }
  }

  let currentIndex = allIndices.length;
  let remainingBombs = bombCount;

  while (remainingBombs) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const temp = allIndices[currentIndex];
    allIndices[currentIndex] = allIndices[randomIndex];
    allIndices[randomIndex] = temp;

    const { x, y } = allIndices[currentIndex];
    matrix[y][x] = 1;
    remainingBombs--;
  }
}

function getAllNearestCells(coordinates) {
  const { x, y } = coordinates;

  const n_1 = matrix[y - 1]?.[x];
  const n_2 = matrix[y - 1]?.[x + 1];
  const n_3 = matrix[y]?.[x + 1];
  const n_4 = matrix[y + 1]?.[x + 1];
  const n_5 = matrix[y + 1]?.[x];
  const n_6 = matrix[y + 1]?.[x - 1];
  const n_7 = matrix[y]?.[x - 1];
  const n_8 = matrix[y - 1]?.[x - 1];

  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(
    (item) => typeof item !== 'undefined'
  );
}

function endOfGame() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((cell) => {
      if (cell.hasBomb) {
        cell.open();
      }
    });
  });
}

function createMatrix(width = 10, height = 10, bombCount = 10) {
  const gameboardHTML = localStorage.getItem('gameboard');
  const gameboardElement = document.querySelector(
    '.minesweeper-game__gameboard'
  );

  if (gameboardHTML) {
    gameboardElement.innerHTML = gameboardHTML;
    applyCellBehavior();
    restoreGameProgress()
    return;
  }

  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  setBombs(bombCount);

  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newCell = createCell(Boolean(matrixElem), { x, y });

      matrix[y][x] = newCell;
    });
  });
}

export { createMatrix, endOfGame, getAllNearestCells, matrix };
