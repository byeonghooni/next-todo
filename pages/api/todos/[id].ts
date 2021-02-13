import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PATCH') {
		res.statusCode = 405;
		return res.end();
	}

	try {
		const todoId = Number(req.query.id);
		const isExist = await Data.todo.exist({ id: todoId });
		if (!isExist) {
			res.statusCode = 404;
			return res.end();
		}

		const todos = await Data.todo.getList();
		const changedTodos = todos.map((todo) => {
			if (todo.id === todoId) {
				return {
					...todo,
					checked: !todo.checked,
				};
			}
			return todo;
		});
		Data.todo.write(changedTodos);

		res.statusCode = 200;
		res.end();
	} catch (e) {
		res.statusCode = 405;
		res.send(e);
	}
};
