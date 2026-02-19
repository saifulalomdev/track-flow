import { AppInstance } from "./create-app";

export function registerErrorHandler(app: AppInstance) {
    app.onError((err, c) => {
        console.log(err.message)
        return c.json({}, 400)
    })
}