"use strict";
// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    setupFiles: ['dotenv/config']
};
exports.default = config;
