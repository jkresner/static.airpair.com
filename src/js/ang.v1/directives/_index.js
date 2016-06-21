require('./external/directives.js')
require('./input/directives.js')
require('./layout/directives.js')


angular.module('AirPair.Directives',
              ['AirPair.Directives.External',
               'AirPair.Directives.Input',
               'AirPair.Directives.Layout'])
