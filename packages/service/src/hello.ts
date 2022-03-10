import { Request } from "koa";

const hello = (req: Request): Promise<any> => new Promise((resolve, reject) => {
	const { query } = req;
	if (!query) {
		resolve("has query");
	} else {
		reject(new Error());
	}
});

export default hello;
