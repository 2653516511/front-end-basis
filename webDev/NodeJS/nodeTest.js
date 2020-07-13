var http = require('http')

http.createServer(function(request, response) {
    response.writeHead(200, {'content-type': 'text/plain'})

    response.end('hello word\n')
}).listen(8888)

console.log('nodeTest server running at http://127.0.0.1:8888/')