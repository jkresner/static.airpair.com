var colors = require('colors')
var path = require('path')
var http = require('http')
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')

var env = process.env.ENV || 'dev'
var port = process.env.PORT || 8000
var serveOps = {fallthrough:false}
var staticDir = path.join(__dirname,'public')
var serve = serveStatic(staticDir)

var server = http.createServer(function(req, res) {  
  
  console.log(req.url)

  var opts = {
    env: env,
    onerror: function(err, req, res) { console.log(req.url.red) }
  }
  
  serve(req, res, finalhandler(req, res, opts))

})

console.log('Try listen on: '.gray, port.toString().white, staticDir)
server.listen(port, () => {
  console.log('Listening on: '.gray + port.toString().white)
})