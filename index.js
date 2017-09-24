var colors                   = require('colors')
var path                     = require('path')
var http                     = require('http')
var serveStatic              = require('serve-static')


var port            = process.env.PORT || 8000
var local           = port == 8000
var allowCORSHost   = local ? "*" : "https://www.airpair.com"

var servePublic     = serveStatic(path.join(__dirname,'host','public'))
var serveArchive    = serveStatic(path.join(__dirname,'host','archive'))

var server = http.createServer(function (req, res) {

  // var host = req.headers.host
  // console.log('host'.yellow, host)

  res.setHeader("Access-Control-Allow-Origin", allowCORSHost)
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if (!local)
    console.log(req.method+'\t', req.url)

  servePublic(req, res, function(e1) {
    serveArchive(req, res, function(e2) {

      res.statusCode = e2 ? (e2.status || 500) : 404
      let ref = req.headers.referer
      let url = `${res.statusCode}\t ${req.url}${ref?' << '+ref:''}`
      console.log(url.red)
      res.end(e2 ? e2.stack : 'Not found')

    })
  })

})


console.log('Starting:'.gray + ' static.airpair')
server.listen(port, function() {
  if (!local)
    console.log('listening on: '.gray + port.toString().white)
})
