import { AppInstance } from "./create-app";
import websiteController from "@/modules/site/site.controller";
import eventController from "@/modules/event/event.controller";
import clerkController from '@/modules/clerk/clerk.controller';
import { requireAuth } from '@/middleware/require-auth';

export function registerRoutes(app: AppInstance) {
    app.route("/events", eventController);

    app.use("/sites/*", requireAuth)
        .route("/sites", websiteController);

    app.route("/webhooks", clerkController);
}