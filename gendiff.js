#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1') // версию можно взять из package.json
  .helpOption('-h, --help', 'display help for command');

program.parse(process.argv);
