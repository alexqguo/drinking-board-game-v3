#!/usr/bin/env node
/**
 * CLI tool for validating board schemas
 */
import fs from 'fs/promises';
import path from 'path';
import { validateBoardSchema } from './validation.js';

/**
 * Validate a board schema file
 *
 * @param filePath Path to the board schema JSON file
 */
async function validateBoard(filePath: string): Promise<void> {
  try {
    console.log(`Validating board schema: ${filePath}`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const boardData = JSON.parse(fileContent);

    // Validate schema (includes structure and i18n validation)
    validateBoardSchema(boardData);
    console.log(`✅ Board schema is valid: ${filePath}`);
  } catch (e) {
    console.error(`❌ Board validation failed for ${filePath}:`, e);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Please provide a path to the board schema file');
    console.error('Usage: validate-board <path-to-schema.json>');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]!);
  await validateBoard(filePath);
}

main();
