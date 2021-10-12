const inputElem = document.querySelector('input');
const addBtnElem = document.querySelector('.add-btn');
const ul = document.querySelector('.list-area');
const countElem = document.querySelector('.count-list');
const clearBtnElem = document.querySelector('.clear-all-btn');

const data = JSON.parse(localStorage.getItem('todo')) || [];

const setLocalStorage = (data) => {
    localStorage.setItem('todo', data);
}

const getListPending = () => {
    const pendindItems = [...ul.children].filter(item => !item.className);
    return pendindItems.length;
}

const setCountList = () => {
    countElem.innerText = getListPending();
}

const removeItem = (id) => {
    const thisItem = document.getElementById(id);
    thisItem.remove();

    const index = data.findIndex(value => value.id === id);
    data.splice(index, 1);
    setCountList();
    setLocalStorage(JSON.stringify(data));
}

const completedItem = (id) => {
    const thisItem = document.getElementById(id);
    thisItem.children[0].style.textDecoration = 'line-through';
    thisItem.children[1].style.display = 'none';
    thisItem.classList.add('completed');

    const index = data.findIndex(value => value.id === id);
    let arr = data[index];
    data.splice(index, 1);
    arr.completed = true;
    data.splice(index, 0, arr);
    console.log(data);
    setCountList();
    setLocalStorage(JSON.stringify(data));
}

const clearItem = () => {
    const items = document.querySelector('ul');
    items.innerHTML = '';
    setCountList();
    data.splice(0, data.length);
    localStorage.clear();
}

const setDataFromInput = () => {
    const todoInput = inputElem.value;
    inputElem.value = '';
    if (todoInput) {
        const todoObj = {
            id: Date.now().toString(),
            todo: todoInput,
            completed: false
        }
        data.push(todoObj);
        return true;
    } else {
        alert('Invalid');
        return false;
    }
}

const createTodoItem = (data) => {
    const li = document.createElement("li");
    const completedBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('check-btn');
    completedBtn.addEventListener('click', () => completedItem(data.id));
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => removeItem(data.id));

    li.innerHTML = `<span class="todo-txt">${data.todo}</span>`;
    li.appendChild(completedBtn);
    li.appendChild(removeBtn);
    li.setAttribute('id', data.id);
    if (data.completed) li.classList.add('completed');
    ul.appendChild(li);

    setCountList();
}

const addTodoItem = () => {

    const setDataCompleted = setDataFromInput();
    if (setDataCompleted) {
        const currentData = data[data.length - 1];
        createTodoItem(currentData);
        setLocalStorage(JSON.stringify(data));
    }
}

const onClickAddTodo = () => {
    addTodoItem();
}

const onEnterAddTodo = (e) => {
    if (e.key === 'Enter') {
        addTodoItem();
    }
}

const run = () => {
    addBtnElem.addEventListener('click', onClickAddTodo);
    clearBtnElem.addEventListener('click', clearItem);
    inputElem.addEventListener('keydown', onEnterAddTodo);

    data.forEach(item => createTodoItem(item));
    [...ul.children].forEach(item => {
        console.log(item);
        if (item.className) {
            item.children[0].style.textDecoration = 'line-through';
            item.children[1].style.display = 'none';
        }
    })
}
run();