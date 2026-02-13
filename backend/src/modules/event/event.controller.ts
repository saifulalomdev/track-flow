// src/modules/event.controller.ts
import { collectRoute } from './event.routes';
import { createApp } from '@/app/create-app';

const eventController = createApp();

eventController.openapi(collectRoute, async (c) => {
    const data = c.req.valid("json");

    const { country, city } = (c.req.raw as any).cf;

    const eventData = data.events.map((e) => ({ ...e, country, city }));

    // TODO: chcke if user limits is over or not
    // if limit over simply throw rate limit error

    await c.env.EVENTS_QUEUE.send(eventData);

    return c.json({ success: true, message: "events received." }, 202)
})

export default eventController;