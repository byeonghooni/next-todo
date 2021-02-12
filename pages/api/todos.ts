import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import axios from '.';
import { TodoType } from '../../types/todo';

export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.statusCode = 405;
		return res.end();
	}

	try {
		const todos: TodoType[] = await new Promise<TodoType[]>(
			(resolve, reject) => {
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
			},
		);

		res.statusCode = 200;
		return res.send(todos);
	} catch (e) {
		res.statusCode = 500;
		res.send(e);
	}
};
