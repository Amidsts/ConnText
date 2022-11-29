"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./helpers/logger");
const index_1 = __importDefault(require("./helpers/index"));
const env_1 = require("./utils/env");
// import c from "./"
(function () {
    const app = (0, express_1.default)();
    (0, index_1.default)(app);
    app.listen(env_1.PORT, () => {
        logger_1.logger.info(`server listening on port ${env_1.PORT}`);
    });
})();
