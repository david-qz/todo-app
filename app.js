import { getUser, signOut } from './services/auth-service.js';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './services/todo-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createTodos from './components/Todos.js';
import createAddTodo from './components/AddTodo.js';

// State
let user = null;
let todos = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    // set todos state from get all service function
    todos = await getAllTodos();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAdd(task) {
    // 1. create a new todo with description set to task and complete false
    // 2. push the new todo into the todos array
    const todo = await createTodo({
        description: task,
        complete: false,
    });

    if (todo) todos.push(todo);

    display();
}

async function handleComplete(todo) {
    // 1. Toggle todo complete property
    // 2. Get the index of the current todo
    // 3. Update that index of the array with the result of the update service function
    todo.complete = !todo.complete;
    const index = todos.findIndex((v) => v.id === todo.id);
    if (index === -1) return;

    const newTodo = await updateTodo(todo);

    if (newTodo) todos.splice(index, 1, newTodo);

    display();
}

async function handleEdit(todo, task) {
    // 1. Set the todo description to the new task text
    // 2. Get the index of the current todo
    // 3. Update that index of the array with the result of the update service function
    todo.description = task;
    const index = todos.findIndex((v) => v.id === todo.id);
    if (index === -1) return;

    const newTodo = await updateTodo(todo);

    if (newTodo) todos.splice(index, 1, newTodo);

    display();
}

async function handleDelete(todo) {
    // 1. Get the index of the current todo
    // 2. Call the delete service function
    // 3. remove the todo from the todos array using splice
    const index = todos.findIndex(v => v.id === todo.id);
    if (index === -1) return;

    const deletedTodo = await deleteTodo(todo);

    if (deletedTodo) todos.splice(index, 1);

    display();
}

const Todos = createTodos(document.querySelector('.todo-list'), {
    handleComplete,
    handleEdit,
    handleDelete
});

const AddTodo = createAddTodo(document.querySelector('.new-todo'), { handleAdd });

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });
    Todos({ todos });
    AddTodo();
}

handlePageLoad();
