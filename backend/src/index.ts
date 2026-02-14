import { queue } from './queue';
import { createApp } from './app/create-app';
import { registerRoutes } from './app/register-routes';
import { registerErrorHandler } from './app/register-error-handler';
import { registerMiddlewares } from './app/register-middlewares';

const app = createApp();

registerMiddlewares(app)
registerRoutes(app);
registerErrorHandler(app);

export default {
    fetch: app.fetch,
    queue
}
