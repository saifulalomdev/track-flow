import { queue } from './queue';
import { createApp } from './app/create-app';
import { registerRoutes } from './app/register-routes';
import { registerErrorHandler } from './app/register-error-handler';
import { registerMiddlewares } from './app/register-middlewares';
import { registerDocs } from './app/register-docs';

const app = createApp();

registerMiddlewares(app);
registerRoutes(app);
registerErrorHandler(app);
registerDocs(app);

export default {
    fetch: app.fetch,
    queue
}
