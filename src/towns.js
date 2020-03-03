/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
loadTowns();

function loadTowns() { 
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';    
    
    const fragment = document.createDocumentFragment();

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

    function fillOk(cities) {
        for (const city of cities) {
            const div = document.createElement('div');

            div.classList.add('city');
            div.textContent = city.name;
            fragment.appendChild(div);
        }
        
        homeworkContainer.appendChild(fragment);
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';    
    }

    function fillError() {
        const btn = document.createElement('button');

        loadingBlock.textContent = 'Не удалось загрузить города...';
        btn.id = 'btn';
        btn.textContent = 'Повторить';
        homeworkContainer.appendChild(btn);
        btn.addEventListener('click', () => {
            btn.remove();
            loadTowns();
        });
    }

    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            fillOk(sort(response));

            return sort(response);
        })
        .catch(function() {
            fillError();
        });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (chunk) {
        return full.toLowerCase().includes(chunk.toLowerCase());
    } 
    
    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function(e) {
    while (filterResult.firstChild) {
        filterResult.removeChild(filterResult.firstChild);
    }

    for (let child of homeworkContainer.children) {
        if (child.classList[0] == 'city' && isMatching(child.textContent, e.target.value)) {
            const li = document.createElement('li');

            li.textContent = child.textContent;
            li.style.color = 'red';
            filterResult.appendChild(li);
        }
    }
});

export {
    loadTowns,
    isMatching
};
