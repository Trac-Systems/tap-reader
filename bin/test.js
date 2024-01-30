import { configure, processCLIArgs, run } from '@japa/runner'
import { expect } from '@japa/expect'
import { apiClient } from '@japa/api-client'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.js'],
  plugins: [expect(), apiClient('http://localhost:3333')],
})

run()