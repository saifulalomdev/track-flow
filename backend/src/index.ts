import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { openapiConfig } from './config/openapi';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

app.use('*', clerkMiddleware())

app.get('/', (c) => {
    const auth = getAuth(c);
    console.log(auth)

  return c.text('Hello Hono!')
})


app.doc("/docs/json", openapiConfig);
app.get("/docs", swaggerUI({ url: "/docs/json" }))

export default app
