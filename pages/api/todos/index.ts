import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.statusCode = 405;
		return res.end();
	}

	try {
		const todos = await Data.todo.getList();
		res.statusCode = 200;
		return res.send(todos);
	} catch (e) {
		res.statusCode = 500;
		res.send(e);
	}
};
