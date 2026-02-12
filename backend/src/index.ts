import { openapiConfig } from './config/openapi';
import { swaggerUI } from '@hono/swagger-ui';
import eventController from './modules/event/event.controller';
import { queue } from './queue';
import { createApp } from './app/create-app';

const app = createApp()

app.route("/events", eventController)

app.doc("/docs/json", openapiConfig);

app.get("/docs", swaggerUI({ url: "/docs/json" }))

export default {
    fetch: app.fetch,
    queue
}
