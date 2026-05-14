import { sequence } from "astro:middleware";
import { corsMiddleware } from "./middlewares/cors";
import { authMiddleware } from "./middlewares/auth";
import { logger } from "./middlewares/logger";

export const onRequest = sequence(
    // logger,
    corsMiddleware, 
    authMiddleware,
);