'use strict';

//Выбираем элементы
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Реализация функцианальности броска
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Сгенернировать рандомный номер
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Отобразить на кубике
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3. Проверить равняет ли 1,если да, то ход второго игрока
    if (dice !== 1) {
      //Добавить бросок кубика к текущему счету
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Ход следующего игрока

      switchPlayer();

      //Методы, если бы мне знали toggle
      // if (activePlayer === 1) {
      //   player0El.classList.remove('player--active');
      //   player1El.classList.add('player--active');
      // } else if (activePlayer === 0) {
      //   player1El.classList.remove('player--active');
      //   player0El.classList.add('player--active');
      // }

      // if (player0El.classList.contains('player--active')) {
      //   player0El.classList.remove('player--active');
      //   player1El.classList.add('player--active');
      // } else {
      //   player1El.classList.remove('player--active');
      //   player0El.classList.add('player--active');
      // }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Добавить текущий балл к общему
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Выполнить проверку >=100 баллов
    //Финиш
    diceEl.classList.add('hidden');

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
// //1.Обнулить все значения
// score0El.textContent = 0;
// score1El.textContent = 0;
// current0El.textContent = 0;
// current1El.textContent = 0;
// currentScore = 0;
// activePlayer = 0;
// //2.Убрать класс победителя
// player1El.classList.remove('player--winner');
// player0El.classList.remove('player--winner');
// //3.Сделать активным первого игрока
// player0El.classList.add('player--active');
// player0El.classList.remove('player--active');
// //4.Установить игру в позицию true
// playing = true;
