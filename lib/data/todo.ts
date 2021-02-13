import { TodoType } from '../../types/todo';
import fs, { writeFileSync } from 'fs';

const getList = (): Promise<TodoType[]> => {
	return new Promise<TodoType[]>((resolve, reject) => {
		fs.readFile('data/todos.json', (err, data) => {
			if (err) {
				return reject(err.message);
			}

			const todosData = data.toString();
			if (!todosData) {
				return resolve([]);
			}

			const todos = JSON.parse(todosData);

			return resolve(todos);
		});
	});
};

const exist = async ({ id }: { id: number }) => {
	const todos = await getList();
	return todos.some((todo: TodoType) => todo.id === id);
};

const write = (todos: TodoType[]) => {
	writeFileSync('data/todos.json', JSON.stringify(todos));
};

export default { getList, exist, write };
