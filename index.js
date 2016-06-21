var colors                   = require('colors')
var path                     = require('path')
var http                     = require('http')
var serveStatic              = require('serve-static')


var port            = process.env.PORT || 8000
var allowCORSHost   = port == 8000 ? "http://localhost:3333" : "https://www.airpair.com"

var servePublic     = serveStatic(path.join(__dirname,'host','public'))
var serveArchive    = serveStatic(path.join(__dirname,'host','archive'))

  
var server = http.createServer(function (req, res) {

  // var host = req.headers.host
  // console.log('host'.yellow, host)

  res.setHeader("Access-Control-Allow-Origin", allowCORSHost)
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  console.log(req.method+'\t', req.url)
  
  servePublic(req, res, function(e1) {
    serveArchive(req, res, function(e2) {
  
      res.statusCode = e2 ? (e2.status || 500) : 404;
      console.log(res.statusCode.toString().red+'\t', req.url.red)
      res.end(e2 ? e2.stack : 'Not found');
  
    })
  })

})


console.log('Starting '.gray)
server.listen(port, function() {
  console.log('Listening on: '.gray + port.toString().white)
})