"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDB = void 0;
const process = require("process");
const env = process.env;
exports.configDB = {
    type: 'mysql',
    host: env.HOST,
    port: parseInt(process.env.PORT),
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    keepConnectionAlive: true,
    synchronize: true,
};
//# sourceMappingURL=configuration.js.map