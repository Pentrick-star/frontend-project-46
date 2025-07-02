#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>') // <filepath1> и <filepath2> — обязательные аргументы
  .option('-f, --format [type]', 'output format') // Опция для выбора формата вывода
  .helpOption('-h, --help', 'display help for command');

program.parse(process.argv);
