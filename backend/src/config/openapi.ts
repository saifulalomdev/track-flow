import packageJson from '../../package.json';

export const openapiConfig = {
    openapi: "3.0.0",
    info: {
        title: "Track flow",
        version: packageJson.version
    }
}