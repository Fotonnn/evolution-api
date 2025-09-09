import { test } from 'node:test';
import assert from 'node:assert/strict';
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

test('extractGraphError uses err.message when no response', () => {
  const err = new Error('Network Error');
  const info = extractGraphError(err);
  assert.equal(info.message, 'Network Error');
  assert.equal(info.status, undefined);
});
