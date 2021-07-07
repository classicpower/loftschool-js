/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    fn(element, index, array)
  }
}
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */

function map(array, fn) {
  let newArr = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    newArr.push(fn(element, index, array))
  }
  return newArr;

}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  let result;
  let index;
  if (initial !== undefined) {
    index = 0
    result = initial;
  } else {
    index = 1
    result = array[index-1]
  }
  for (index; index < array.length; index++) {
    let element = array[index];
    result = fn(result, element, index, array)
  }

  return result
}


/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = [];
  for (const key in obj) {
    array.push(key.toUpperCase())
  }
  return array;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, val) {
      if (typeof val === 'number') {
        target[prop] = Math.pow(val, 2);
        return true;
      } else {
        return false;
      }
    }
  });
}

export { forEach, map, reduce, upperProps, createProxy };
