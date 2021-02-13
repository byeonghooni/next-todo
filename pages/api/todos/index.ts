import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { TodoType } from '../../../types/todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const httpMethod = req.method;

		if (httpMethod === 'POST') {
			const { text, color } = req.body;
			if (!text || !color) {
				res.statusCode = 400;
				return res.send('text 혹은 color가 없습니다.');
			}

			await writeTodo({ text, color });

			res.statusCode = 200;
			res.end();
		}

		if (httpMethod === 'GET') {
			const todos = await Data.todo.getList();
			res.statusCode = 200;
			return res.send(todos);
		}
	} catch (e) {
		res.statusCode = 405;
		return res.end();
	}
};

const writeTodo = async ({
	text,
	color,
}: {
	text: string;
	color: TodoType['color'];
}) => {
	const todos = await Data.todo.getList();
	const todoId: number =
		todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

	const newTodo = {
		id: todoId,
		text,
		color,
		checked: false,
	};

	Data.todo.write([...todos, newTodo]);
};
