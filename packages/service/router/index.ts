import { Context } from "koa";
import Router from "koa-router";

import hello from "../src/hello";

const router = new Router();

router.get("/hello", async (ctx: Context) => {
	const res = await hello(ctx.request);
	ctx.body = res;
});

export default router;
