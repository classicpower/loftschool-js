/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000);
  })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve, reject) => {
    let sortTowns;

    fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
      .then(towns => {
        sortTowns = towns.sort((a, b) => {
          let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
          if (nameA < nameB)
            return -1
          if (nameA > nameB)
            return 1
          return 0
        })
        resolve(sortTowns);
      })

    function fetch(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
          if (xhr.status >= 400) {
            reject();
          } else {
            resolve(xhr.response);
          }
        });
      });
    }
  })
}

export { delayPromise, loadAndSortTowns };
