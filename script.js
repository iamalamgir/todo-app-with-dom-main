//My Dom practice-26-07-2021.
/*
console.dir(document);
//console.log(typeof(document));
console.dir(document.title);
console.log(document.URL);
console.log(document.domain);
console.log(document.head);
console.log(typeof(document.head));
console.dir(document.head);
console.log(document.body);
console.dir(document.body);
//document.title = 'Play with DOM';
console.log(document.all);
console.log(typeof(document.all));
for(let element of document.all){
    console.log(element);
}
console.log(document.images);
console.log(document.links);
console.log(document.forms);
*/


/*
//GET ELEMENT BY ID
console.log(document.getElementById('new-task'));
console.log(document.getElementById('header'));

let headerElement = document.getElementById('header');
console.dir(headerElement);
headerElement.style.color = 'red';
headerElement.style.fontSize = '50px';

//headerElement.textContent = 'To-Do-Apps';
//headerElement.innerText = 'To-Do-App';
console.log(headerElement.textContent);
console.log(headerElement.innerText);
console.log(document.getElementsByClassName('item'));

let items = document.getElementsByClassName('item');
for(let i = 0; i<items.length; i++){
    items[i].style.color = 'red';
}
*/


/*
//GET ELEMENT BY ID tagname 
let items = document.getElementsByTagName('li');
console.log('items');

let items = document.getElementsByTagName('h2');
console.log('items');
*/


/*
//Query Selector
let lastItem = document.querySelector('.item:last-child');
lastItem.style.color = 'red'
console.log(lastItem);

let lastItems = document.querySelectorAll('.item:last-child');
//lastItem.style.color = 'red'
for(let element of lastItems){
    element.style.color = 'red';
}
console.log(lastItems);
let lastItem = document.querySelector('.item:nth-child(2)')
lastItem.style.color = 'red';

let lastItem = document.querySelector('#items').querySelector('.item:nth-child(3)')
lastItem.style.color = 'red';
*/


/*
///Parent/Child relation
const parent = document.querySelector('#items');
const children = parent.children;
console.log(children);

///Grandparent to children.
const grandparent = document.querySelector('.todo-list');
// const parent = grandparent.children;
// const children = parent[1].children;
const children = grandparent.querySelectorAll('.item');
console.log(children);

///Children to grandparent.
const children = document.querySelector('.item');
const parent = children.parentElement;
console.log(parent);

///Any children to grandparent.
const grandparent = children.closest('.todo-list');
console.log(grandparent);

///Children to side by children.
const childrenOne = document.querySelector('.item');
const childrenTwo = childrenOne.nextElementSibling;
childrenTwo.style.color = 'red';
console.log(childrenTwo);

///Low children to Up children.
const childrenTwo = document.querySelector('.item').nextElementSibling;
const childrenOne = childrenTwo.previousElementSibling;
childrenOne.style.color = 'red';
*/


/*
///Creating and Element
const divElement = document.createElement('div');
console.log(divElement);

///Dynamic element add html e
const divElement = document.createElement('div');
divElement.className = 'red';
divElement.setAttribute('id', 'red');
divElement.setAttribute('title', 'Red Div');
const container = document.querySelector('.todo-list');
const h2Element = container.querySelector('h2');
container.insertBefore(divElement, h2Element);

///Dynamic element add html div er last e
container.appendChild(divElement);
container.append('Hello World');

const a = container.appendChild(divElement);//ekta element pass kora jay.
const b = container.append(divElement);
console.log(a);
console.log(b);

///ek sathe onek element pass kora
container.append(divElement, document.createElement('p'), 'Hello World');
*/


/*
///event listeners
const headerElement = document.querySelector('#header');
headerElement.addEventListener('click', (event) => {
    console.log(event);
});

headerElement.addEventListener('dblclick', (event) => {
    console.log(event);
});

headerElement.addEventListener('mousedown', (event) => {
    console.log(event);
});

headerElement.addEventListener('mouseup', (event) => {
    console.log(event);
});

headerElement.addEventListener('mouseenter', (event) => {
    console.log(event);
});

headerElement.addEventListener('mouseleave', (event) => {
    console.log(event);
});

const inputElement = document.querySelector('input[type="text"]');
//'keydown','keyup','keypress','keyfocus','keyblur','keycut','keypaste','keyinput'
inputElement.addEventListener('keyup', (event) => {
    console.log(event);
});

const inputElement = document.querySelector('input[type="text"]');
inputElement.addEventListener('keydown', (event) => {
    console.log(event.target.value);
});

const formElement = document.querySelector('form');
formElement.addEventListener('submit', (event) => {
    console.log(event);
});

const formElement = document.querySelector('form');
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target);
});
*/


/*****Create to-do app*****/
// select elements & assign them to variables
let newTask = document.querySelector('#new-task');
let form = document.querySelector('form');
let todoUl = document.querySelector('#items');
let completeUl = document.querySelector('.complete-list ul');


// functions
let createTask = function(task) {
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function(event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    // bind the new list item to the incomplete list
    bindInCompleteItems(listItem, completeTask);
}

let completeTask = function() {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();
    completeUl.appendChild(listItem);
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindInCompleteItems = function(taskItem, checkboxClick) {
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkboxClick;
}

let bindCompleteItems = function(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

for(let i = 0; i < todoUl.children.length; i++ ) {
    bindInCompleteItems(todoUl.children[i], completeTask);
}

for(let i = 0; i < completeUl.children.length; i++ ) {
    bindCompleteItems(completeUl.children[i], deleteTask);
}

form.addEventListener('submit', addTask);
