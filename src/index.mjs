import http from 'http'

const requestListener = function (req, res) {
  const id = Math.random()
  const start = new Date
  console.log('[%s] [%o] start', start.toISOString(), id)
  console.log('%s %s HTTP/%s', req.method, req.url, req.httpVersion)
  for (let i = 0; i < req.rawHeaders.length; i+=2) {
    process.stdout.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i+1]}\n`)
  }
  process.stdout.write(`\n`)
  req.on('data', function (chunk) {
    process.stdout.write(chunk.toString())
  })
  req.on('end', function() {
    const end = new Date
    const diff = BigInt(end.valueOf()) - BigInt(start.valueOf())
    console.log('\n[%o] [%o] end (+%o ms)', end.toISOString(), id, diff)
  })
  res.writeHead(200)
  res.end()
}

const server = http.createServer(requestListener);
server.listen(3000)
