#!/usr/bin/env node

import { program } from 'commander'
import gendiff from '../src/gendiff.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      const filesDifferrence = gendiff(filepath1, filepath2, options.format)
      console.log(filesDifferrence)
    }
    catch (error) {
      console.log(error)
    }
  })

program.parse()
