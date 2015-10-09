var path = require('path')
var http = require('http')
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')

var port = process.env.PORT || 8000
var serve = serveStatic(path.join(__dirname,'public'))

var server = http.createServer(function(req, res) {
  serve(req, res, finalhandler(req, res))
})

server.listen(port)