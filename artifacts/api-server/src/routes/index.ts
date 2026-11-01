import { Router, type IRouter } from "express";
import healthRouter from "./health";
import catalogRouter from "./catalog";
import suggestRouter from "./suggest";
import productRouter from "./product";

const router: IRouter = Router();

router.use(healthRouter);
router.use(catalogRouter);
router.use(productRouter);
router.use("/search", suggestRouter);

export default router;
