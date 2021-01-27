/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = getCookie();
let filterValue = '';

filterNameInput.addEventListener('input', filterCookie)

addButton.addEventListener('click', setCookie);

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    let element = e.target.parentNode.parentNode;
    let elementText = element.firstChild.textContent
    delete cookies[elementText];
    document.cookie = `${elementText}=''; max-age=0`;
    updateTable()
  }
});

function filterCookie() {
  filterValue = this.value
  updateTable()
}
function setCookie() {
  const name = addNameInput.value;
  const value = addValueInput.value;
  if (!name) {
    return
  }

  document.cookie = `${name}=${value}; max-age=3600`;
  cookies[name] = value;
  updateTable()
}

function getCookie() {
  return document.cookie.split('; ').filter(Boolean).reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}


function updateTable() {
  const fragment = document.createDocumentFragment();
  let total = 0;
  listTable.innerHTML = '';

  for (const name in cookies) {
    if (cookies.hasOwnProperty(name)) {
      const value = cookies[name];
      if (filterValue &&
        !isMatching(name, filterValue) && !isMatching(value, filterValue)) {
        continue;
      }

      total++
      fragment.append(createTr(name, value))
    }
    if (total) {
      listTable.parentNode.classList.remove('hidden')
      listTable.append(fragment)
    } else {
      listTable.parentNode.classList.add('hidden')
    }
  }

}
updateTable()

function isMatching(full, chunk) {
  return full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1
}

function createTr(name, value) {
  const tr = document.createElement('tr');
  const btn = createBtnDelete();
  const nameTd = createTd(name);
  const valueTd = createTd(value);
  const btnTd = createTd(btn);
  tr.append(nameTd, valueTd, btnTd)
  return tr;
}
function createBtnDelete() {
  const btn = document.createElement('button');
  btn.setAttribute('type', 'button')
  btn.textContent = 'Удалить'
  return btn
}
function createTd(val) {
  const td = document.createElement('td');
  if (val.tagName === 'BUTTON') {
    td.appendChild(val)
  } else {
    td.innerHTML = val
  }
  return td
}