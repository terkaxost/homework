/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div'); 

    newDiv.classList.add('draggable-div');
    newDiv.draggable = true;
    newDiv.style.position = 'absolute';
    newDiv.style.width = `${randomUnderMax(300)}px`;
    newDiv.style.height = `${randomUnderMax(300)}px`;
    newDiv.style.top = `${50 + randomUnderMax(400)}px`;
    newDiv.style.left = `${50 + randomUnderMax(400)}px`;
    newDiv.style.backgroundColor = `rgb(${randomUnderMax(256)}, ${randomUnderMax(256)}, ${randomUnderMax(256)})`;

    return newDiv;
}

function randomUnderMax(max) {
    let result;  

    result = Math.floor(Math.random() * (max));
    
    return result;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);

   target.addEventListener('dragover', (e) => {
        e.preventDefault();
        console.log(`X:${e.screenX} Y:${e.screenY}`);
    });
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
 */
var i = 0;

function addListeners(target) {
    let deltaY = 0;
    let deltaX = 0;
    let screenY = 0;
    let screenX = 0;
    let currentTarget;
    
    i++;
    target.id = `div${i}`;

    homeworkContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/html', '...');
        currentTarget = homeworkContainer.querySelector(`#${e.target.id}`);
        screenY = e.y;
        screenX = e.x;
    });
    homeworkContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        deltaY = e.y - screenY;
        deltaX = e.x - screenX;
    });
    homeworkContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        currentTarget.style.top = `${+currentTarget.style.top.replace('px', '') + deltaY}px`;
        currentTarget.style.left = `${+currentTarget.style.left.replace('px', '') + deltaX}px`;
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    const div = createDiv(); // создать новый div
    
    homeworkContainer.appendChild(div); // добавить на страницу
    
    addListeners(div); // назначить обработчики событий мыши для реализации D&D
});

export {
    createDiv
};