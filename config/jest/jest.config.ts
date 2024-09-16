import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ['node_modules'],
    modulePaths: ['<rootDir>src'],
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    testMatch: ['<rootDir>src/**/*/?(*.)@(spec|test).[tj]s?(x)'],
    rootDir: '../../',
    setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
    moduleNameMapper: {
        '^swiper$': '<rootDir>/config/jest/emptyModule.js',
        '^swiper/(.*)$': '<rootDir>/config/jest/emptyModule.js',
        '\\.s?css$': 'identity-obj-proxy',
        // '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
        '\\.svg$': '<rootDir>/config/jest/jestEmptyComponent.tsx',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
    },
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: '<rootDir>/reports/unit',
                filename: 'report.html',
                openReport: true,
                inlineSource: true,
            },
        ],
    ],
};

export default config;
