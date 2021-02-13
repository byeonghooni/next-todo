import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const httpMethod = req.method!;

	if (!['DELETE', 'PATCH'].includes(httpMethod)) {
		res.statusCode = 405;
		return res.end();
	}

	const todoId = Number(req.query.id);
	const isExist = await Data.todo.exist({ id: todoId });
	if (!isExist) {
		res.statusCode = 404;
		return res.end();
	}

	const todos = await Data.todo.getList();

	try {
		let updatedTodos = null;

		if (httpMethod === 'DELETE') {
			updatedTodos = todos.filter((todo) => todo.id !== todoId);
		}

		if (httpMethod === 'PATCH') {
			updatedTodos = todos.map((todo) => {
				if (todo.id === todoId) {
					return {
						...todo,
						checked: !todo.checked,
					};
				}
				return todo;
			});
		}

		updatedTodos && Data.todo.write(updatedTodos);
		res.statusCode = 200;
	} catch (e) {
		res.statusCode = 500;
	}

	res.end();
};
