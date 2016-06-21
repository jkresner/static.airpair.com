angular.module("AirPair.Directives.Layout", [])


.directive('errorsHeader', () => ({

  template: require('./errorsHeader.html'),
  controller($rootScope, $scope, ERR) {

    $scope.clear = ERR.clear
    $rootScope.$on('$routeChangeSuccess', ERR.clear)

  }

}))


.directive('mainLoading', () => ({

  template: require('./mainLoading.html'),
  scope: { loading: '=loading' },
  controller($rootScope) {
    $rootScope.$on('$routeChangeSuccess',
      () => $rootScope.ui.main.loading = true )
  }

}))
