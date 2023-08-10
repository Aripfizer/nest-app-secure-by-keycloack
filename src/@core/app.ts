import { INestApplication } from "@nestjs/common";

let app: INestApplication;

export function setApp(appInstance: INestApplication): void {
    app = appInstance;
}

export function getApp(): INestApplication {
    return app;
}