/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
    createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент   
 */
function createDivWithText(text) {
    let div = document.createElement('div');

    div.textContent = text;
    
    return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
function prepend(what, where) {
    const allElemWhere = [];

    for (const elemWhere of where.children) {
        allElemWhere.push(elemWhere);
    }   

    allElemWhere.unshift(what);

    for (let i = 0; i < allElemWhere.length; i++) {
        // where.removeChild(elemWhere);
        where.appendChild(allElemWhere[i]);
        
    }
}
const container = document.querySelector('#container');
prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
console.log(elem.tagName);
console.log(elem.nextElementSibling.tagName);
console.log( findAllPSiblings(document.body) );
 */
function findAllPSiblings(where) {
    let arr = [];
    
    for (let child of where.children) {
        try {
            if (child.nextElementSibling.tagName == 'P') {
                arr.push(child);
            }
        } catch (e) {
            return arr;
        }
    }
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    let result = [];

    for (let child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
deleteTextNodes( document.querySelector('#container') );
 */
function deleteTextNodes(where) {
    for (let child of where.childNodes) {
        if (child.nodeType != 3) {
            where.appendChild(child);
        } else {
            where.removeChild(child);        
        }
    }
}
// deleteTextNodes( document.querySelector('#container') );
/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
deleteTextNodesRecursive( document.querySelector('#container') );
   */
function deleteTextNodesRecursive(where) {
    function fn(fnWhere) {
        if (fnWhere.firstChild) { 
            for (let child of fnWhere.childNodes) {
                deleteTextNodes(child);
                fn(child);
            }
        }
    }
    fn(where);
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
var container = document.querySelector('#container');
console.log( collectDOMStat( container ) );
console.log( container.classList.contains("myClass") );
 */
function collectDOMStat(root) {
    let obj = {
        tags: {},
        classes: {},
        texts: 0
    };

    function fn(where) {
        if (where.firstChild) {
            for (let child of where.childNodes) {
                if (child.nodeType == 3) {
                    obj.texts++;
                }
                if (child.tagName) {
                    if (!obj.tags[child.tagName]) {
                        obj.tags[child.tagName] = 0;
                    }
                    obj.tags[child.tagName]++;
                }
                if (child.className) {
                    for (let i = 0; i < child.classList.length; i++) {
                        if (!obj.classes[child.classList[i]]) {
                            obj.classes[child.classList[i]] = 0;
                        }    
                        obj.classes[child.classList[i]]++;
                    }
                }
                fn(child);
            }        
        }
    }
    fn(root);

    return obj;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }

 */

function observeChildNodes(where, fn) {
    let arr = {};
    let myObserver;
    
    myObserver = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                arr.type = 'insert';
                arr.nodes = [];
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    arr.nodes.push(mutation.addedNodes[i]);
                }
                fn(arr);
            } else if (mutation.removedNodes.length) {
                arr.type = 'remove';
                arr.nodes = [];
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    arr.nodes.push(mutation.removedNodes[i]);
                }
                fn(arr);
            }
        }
    });
    myObserver.observe(where, {
        childList: true,
        subtree: true
    });
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
