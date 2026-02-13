import { createApp } from "@/app/create-app";
import clerkController from "./clerk/clerk.controller";

const webhooksRoutes = createApp();

webhooksRoutes.route("/clerk", clerkController)
// webhooksRoutes.route("/stip", clerkController);

export default webhooksRoutes