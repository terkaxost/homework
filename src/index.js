/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
var myArr = [11, 22, 33];
function myFn() {
    console.log(arguments);
}
myArr.forEach(myFn);
console.log('===');
forEach(myArr, myFn);
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
function myFn() {
    //console.log(arguments);
    return arguments[0] + '!';
}
var myArr = ['monday', 'tuesday', 'wednesday'];

var myArrMap = myArr.map(myFn);
console.log(myArrMap);
console.log('===');
myArrMap = map(myArr, myFn);
console.log(myArrMap);
 */
function map(array, fn) {
    let inArr = [];
    
    for (let i = 0; i < array.length; i++) {
        inArr[i] = fn(array[i], i, array);
    }
    
    return inArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
var myArr = [11, 22, 33, 44];
var myIni = 0;
var myFn = function() {
    console.log(arguments);
    return arguments[0] + arguments[1];
}
var result = myArr.reduce(myFn, myIni);
console.log(result);
console.log('===');
myResult = reduce(myArr, myFn, myIni)
console.log(myResult);
 */

function reduce(array, fn, initial) {
    let inTemp;
    let i;

    if (initial == undefined) {
        inTemp = array[0];
        i = 1;
    } else {
        inTemp = initial;
        i = 0;
    }
    for (i; i < array.length; i++) {
        inTemp = fn(inTemp, array[i], i, array);
    }
    
    return inTemp;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
var result = upperProps({ name: 'Сергей', lastName: 'Петров' }) // вернет ['NAME', 'LASTNAME']
console.log('===');
console.log(result);
 */
function upperProps(obj) {
    let inArr = [];
    
    for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
            inArr.push(key.toUpperCase());    
        }
    }

    return inArr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
var myArr = ['a', 'b', 'c', 'd', 'e'];
var myFrom = 1;
var myTo = 3;
//console.log(myArr.slice(-5, 2));
console.log( myArr.slice(-10, -110) );

var result = slice(myArr, -10, -110);
console.log(result);
 */
function slice(array, from, to) {
    let inArr = [];
    let inFrom;
    let inTo;

    if (from == undefined | - from > array.length) {
        inFrom = 0;
    } else if (from < 0) {
        inFrom = array.length + from;
    } else if (from >= 0) {
        inFrom = from;
    } 
    if (to == undefined | to > array.length) {
        inTo = array.length
    } else if (to < 0) {
        inTo = array.length + to;
    } else if (to >= 0) {
        inTo = to;
    }
    for (let i = 0; i < inTo - inFrom; i++) {
        inArr[i] = array[i + inFrom];
    }

    return inArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

var myTarget = {name1: '3qr3v', name2: '2fwsv'};
var myProxy = new Proxy(myTarget, {
    get(target, property) {
        //console.log(arguments);
        //console.log('!!!', target[property]);
        return target[property]*target[property];
    }
});

myProxy.test = 11;
console.log(myProxy);
console.log(myTarget.test);
console.log(myProxy.test);
console.log('===');

var myObj = {};

function createProxy(obj) {
    console.log(...arguments);
    let inTarget = obj;
    let inHandler = {};
   
    inProxy = {target: inTarget, handler: inHandler};

    return inProxy;
}
var resultObj = createProxy(myObj);
console.log(resultObj);
myObj.val2 = 5;
console.log(resultObj);
 */
function createProxy(obj) {
    return obj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};