import { client } from './client.js';

const TABLE = 'todos';

export async function getAllTodos() {
    // get all the todos
    const { data, error } = await client
        .from(TABLE)
        .select()
        .order('created_at', { ascending: true });

    if (error) {
        // eslint-disable-next-line no-console
        console.log('Error in getAllTodos(): ' + error.message);
        return [];
    }

    return data;
}

export async function createTodo(todo) {
    // insert a todo
    const { data, error } = await client
        .from(TABLE)
        .insert(todo)
        .single();

    if (error) {
        // eslint-disable-next-line no-console
        console.log('Error in createTodo(): ' + error.message);
        return {};
    }

    return data;
}

export async function updateTodo(todo) {
    // update todo
    const { data, error } = await client
        .from(TABLE)
        .update({
            description: todo.description,
            complete: todo.complete,
        })
        .match({ id: todo.id })
        .single();

    if (error) {
        // eslint-disable-next-line no-console
        console.log('Error in updateTodo(): ' + error.message);
        return {};
    }

    return data;
}

export async function deleteTodo(todo) {
    // delete todo
    const { data, error } = await client
        .from(TABLE)
        .delete()
        .match({ id: todo.id })
        .single();

    if (error) {
        // eslint-disable-next-line no-console
        console.log('Error in deleteTodo(): ' + error.message);
        return {};
    }

    return data;
}
