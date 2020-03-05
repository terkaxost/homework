/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    let setTime = seconds*1000;

    return new Promise(resolve => {
        setTimeout(function() {
            resolve();
        }, setTime);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
   // console.log( compare({name: 'a2'}, [{name: 'a1'}, {name: 'b1'}, {name: 'c1'}]) );
 */
function loadAndSortTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    function sort(response) {
        let towns = [];

        for (let town of response) {
            compare(town, towns);
        }
        
        return towns;
    }

    function compare(strObj, arrObj) {
        for (let i = 0; i < arrObj.length; i++) {
            if (strObj.name < arrObj[i].name) {
                arrObj.splice(i, 0, strObj);
                
                return arrObj;
            }
        }
        arrObj.push(strObj);
    
        return arrObj;
    }

    return fetch(url)
        .then(response => response.json())
        .then(response => sort(response));
}

export {
    delayPromise,
    loadAndSortTowns
};
