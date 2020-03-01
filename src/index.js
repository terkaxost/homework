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
 */
function loadAndSortTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let unsortTowns = [];
            let sortTowns = [];

            for (const town of response) {
                unsortTowns.push(town.name);
            }
            sortTowns = unsortTowns.sort();

            return sortTowns;
        });
}

export {
    delayPromise,
    loadAndSortTowns
};
