import Koa, { Context } from "koa";
import cors from "koa2-cors";
import Logger from "koa-logger";
import router from "./router";

class App extends Koa {
	constructor(port: number) {
		super();

		// logger
		const logger = Logger();
		this.use(logger);


		// Generic error handling middleware.
		this.use(async (ctx: Context, next: () => Promise<any>) => {
			try {
				await next();
			} catch (error) {
				ctx.body = { error };
				ctx.app.emit("error", error, ctx);
			}
		});

		// cors
		this.use(cors({
			origin: "*",
			allowMethods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With", "X-Custom-Header", "Origin", "Referer", "User-Agent", "Cookie"],
		}));

		// router
		this.use(router.routes());
		this.use(router.allowedMethods({
			throw: true, // replace response header
		}));

		// Application error logging.
		this.on("error", console.error);

		this.listen(port);
	}
}

export default App;