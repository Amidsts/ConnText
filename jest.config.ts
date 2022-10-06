// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  setupFiles: ['dotenv/config']

};

export default config;