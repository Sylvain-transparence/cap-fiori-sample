import type { Config } from '@jest/types';

/**
 * All files
 */
const baseDir = '<rootDir>/srv/**';
const baseTestDir = '<rootDir>/test';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	globalSetup: './test/setup.ts',
	collectCoverage: true,
	collectCoverageFrom: [`${baseDir}/*.ts`],
	testMatch: [`${baseTestDir}/**/*.test.ts`],
};

export default config;
