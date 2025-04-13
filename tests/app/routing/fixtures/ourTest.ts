import { consoleLoggingTest } from './ConsoleLoggingFixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(
    consoleLoggingTest,
);

export { expect } from '@playwright/test';