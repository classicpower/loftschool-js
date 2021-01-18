/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function createDiv() {
  let winParams = {
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  }
  const bcg = {
    red: getRandomInt(0, 255),
    green: getRandomInt(0, 255),
    blue: getRandomInt(0, 255),
  }
  const divPos = {
    left: getRandomInt(0, winParams.width),
    top: getRandomInt(0, winParams.height),
  }
  const divParams = {
    h: getRandomInt(10, winParams.height / 4),
    w: getRandomInt(10, winParams.width / 4)
  }

  const div = document.createElement('div');
  div.classList.add('draggable-div');
  div.style.top = `${divPos.top}px`;
  div.style.left = `${divPos.left}px`;
  div.style.height = `${divParams.h}px`;
  div.style.width = `${divParams.w}px`;
  div.style.backgroundColor = `rgba(${bcg.red},${bcg.green},${bcg.blue})`;
  homeworkContainer.appendChild(div)

  div.addEventListener('mousedown', function (e) {
    e.preventDefault();
    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };
    let divPosX = div.offsetLeft,
      divPosY = div.offsetTop;
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      }
      if (((divPosX - shift.x) >= 0 && (divPosX - shift.x) <= winParams.width) &&
        ((divPosY - shift.y) >= 0 && (divPosY - shift.y) <= winParams.height)) {
        div.style.left = (divPosX - shift.x) + 'px';
        div.style.top = (divPosY - shift.y) + 'px';
      }

    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', createDiv);
