import { beforeEach } from 'vitest';
import { cleanup } from '@testing-library/vue';

beforeEach(() => {
  console.log('Setup before each test.');
  cleanup();
});

