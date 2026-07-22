import test from 'node:test';
import assert from 'node:assert/strict';
import { isGoogleSheetsConfigured } from '../services/googleSheetService.js';

test('detects placeholder values as unconfigured', () => {
  const env = {
    GOOGLE_APP_SCRIPT_URL: 'https://example.com/exec',
    GOOGLE_CLIENT_EMAIL: 'REPLACE_WITH_YOUR_CLIENT_EMAIL',
    GOOGLE_PRIVATE_KEY: 'REPLACE_WITH_YOUR_PRIVATE_KEY',
    GOOGLE_SHEET_ID: 'REPLACE_SPREADSHEET_ID',
  };

  assert.equal(isGoogleSheetsConfigured(env), false);
});

test('accepts a complete direct Sheets configuration', () => {
  const env = {
    GOOGLE_APP_SCRIPT_URL: '',
    GOOGLE_CLIENT_EMAIL: 'service@example.com',
    GOOGLE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n',
    GOOGLE_SHEET_ID: 'sheet-id-123',
  };

  assert.equal(isGoogleSheetsConfigured(env), true);
});
