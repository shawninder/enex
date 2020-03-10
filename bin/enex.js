#!/usr/bin/env node

const program = require('commander')
const extract = require('../')
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version', 'Print the current version')

program.requiredOption('-u, --url <address>', 'The URL of an Engaging Networks page from which to extract data')

program.parse(process.argv)

if (program.debug) {
  console.log(program.opts())
}

main(program)

async function main (prog) {
  const data = await extract(prog.url)
  console.log(`Page ID: ${data.id}`)
  console.log(`Page name: ${data.name}`)
}
