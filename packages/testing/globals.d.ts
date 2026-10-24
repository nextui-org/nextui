/// <reference types="vitest/globals" />
/// <reference types="vitest/browser" />

import type {TestingLibraryMatchers} from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  // Vitest 5 separates the assertion return type from the received value type.
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<T, R> {}
}
