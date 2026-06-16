import { handle } from '@astrojs/cloudflare/handler';

export default {
  async fetch(request, env, ctx) {
    // Optional: Add your custom logic here (e.g., queues, cron jobs, logging)
    
    // The handle function takes the arguments and processes the request
    return handle(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;