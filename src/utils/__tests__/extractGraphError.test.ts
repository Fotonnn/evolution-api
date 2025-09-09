import assert from 'node:assert/strict';
import { test } from 'node:test';

import { extractGraphError } from '../extractGraphError';

test('extractGraphError returns message from response.error.message', () => {
  const err = { response: { status: 400, data: { error: { message: 'Invalid number' } } } };
  const info = extractGraphError(err);
  assert.equal(info.message, 'Invalid number');
  assert.equal(info.status, 400);
});

test('extractGraphError falls back to stringified body when message missing', () => {
  const err = { response: { status: 403, data: { status: 403 } } };
  const info = extractGraphError(err);
  assert.equal(info.message, JSON.stringify({ status: 403 }));
  assert.equal(info.status, 403);
});

test('extractGraphError uses err.status when no response', () => {
  const err = { status: 504, message: 'Gateway Timeout' };
  const info = extractGraphError(err);
  assert.equal(info.message, 'Gateway Timeout');
  assert.equal(info.status, 504);
  assert.deepEqual(info.body, { status: 504, message: 'Gateway Timeout' });
});

test('extractGraphError emits placeholders for pure network errors', () => {
  const err = new Error('Network Error');
  const info = extractGraphError(err);
  assert.equal(info.message, 'Network Error');
  assert.equal(info.status, 'unknown');
  assert.equal(info.body, null);
});
