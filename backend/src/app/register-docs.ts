import { openapiConfig } from "@/config/openapi";
import { AppInstance } from "./create-app";
import { swaggerUI } from "@hono/swagger-ui";

export function registerDocs(app: AppInstance) {
  
    app.doc("/docs/json", openapiConfig);

    app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    });
    app.get("/docs", swaggerUI({ url: "/docs/json" }));
}