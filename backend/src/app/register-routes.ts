import { swaggerUI } from '@hono/swagger-ui';
import { AppInstance } from "./create-app";
import { openapiConfig } from "@/config/openapi";
import websiteController from "@/modules/website/website.controller";
import eventController from "@/modules/event/event.controller";
import clerkController from '@/modules/clerk/clerk.controller';

export function registerRoutes(app: AppInstance) {
    app.route("/events", eventController);
    app.route("/websites", websiteController);
    app.doc("/docs/json", openapiConfig);
    app.route("/webhooks", clerkController);
    app.get("/docs", swaggerUI({ url: "/docs/json" }));
}