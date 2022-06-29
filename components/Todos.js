

export default function createTodos(root, {
    handleComplete,
    handleEdit,
    handleDelete,
}) {

    return ({ todos }) => {
        root.innerHTML = '';

        for (const todo of todos) {
            const li = TodoItem({
                todo,
                handleComplete,
                handleEdit,
                handleDelete,
            });
            root.append(li);
        }
    };
}


export function TodoItem({ todo, handleComplete, handleEdit, handleDelete }) {
    const li = document.createElement('li');
    if (todo.complete) {
        li.classList.add('completed');
    }

    li.addEventListener('dblclick', () => {
        li.classList.add('editing');
        editInput.focus();
    });

    const div = document.createElement('div');
    div.classList.add('view');

    const checkbox = document.createElement('input');
    checkbox.classList.add('toggle');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.complete;
    checkbox.addEventListener('change', () => {
        handleComplete(todo);
    });

    const label = document.createElement('label');
    label.textContent = todo.description;

    const button = document.createElement('button');
    button.classList.add('destroy');
    button.addEventListener('click', () => {
        handleDelete(todo);
    });

    div.append(checkbox, label, button);

    const editInput = document.createElement('input');
    editInput.classList.add('edit');
    editInput.value = todo.description;

    editInput.addEventListener('change', () => {
        handleEdit(todo, editInput.value);
        editInput.blur();
    });

    editInput.addEventListener('blur', () => {
        li.classList.remove('editing');
    });

    li.append(div, editInput);

    return li;
}