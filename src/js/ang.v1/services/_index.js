require('./errorService.js')
require('./apiService.js')
require('./pageService.js')

angular.module('AirPair.Services',
              ['AirPair.Services.API',
               'AirPair.Services.Error',
               'AirPair.Services.Page'])
