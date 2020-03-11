#!/usr/bin/env node

const program = require('commander')
const extract = require('../')
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version', 'Print the current version')

// TODO Allow passing in a list of urls as well
program.requiredOption('-u, --url <address(es)>', 'The URL of an Engaging Networks page from which to extract data, or a comma-separated list of URLs')

program.parse(process.argv)

if (program.debug) {
  console.log(program.opts())
}

main(program)

async function main (prog) {
  const urls = prog.url.split(',')
  return Promise.all(urls.map(async (url) => {
    const data = await extract(url)
    console.log(`${url} (${data.id}): ${data.name}`)
  }))
}
