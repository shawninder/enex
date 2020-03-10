const fetch = require('node-fetch')

const pageNameComment = /<!-- ([^:]+)(?:[:0-9]+) -->/
const urlParts = /\/([0-9]+)\//

module.exports = exports = async function extract (url) {
  const response = await fetch(url)
  const html = await response.text()
  const matches = html.match(pageNameComment)
  const name = (matches && matches[1]) ? matches[1] : null
  return {
    id: extractID(url),
    name
  }
}

function extractID (url) {
  const matches = url.match(urlParts)
  return (matches && matches[1]) ? matches[1] : null
}
