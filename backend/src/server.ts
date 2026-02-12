import {serve} from '@hono/node-server';
import app from '.';

serve( {
    fetch: app.fetch,
    port: 5000
},(info)=> console.log("server listen on port 5000"))