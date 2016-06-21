angular.module("AirPair.Services.Page", [])


.factory('PAGE', function pageFactory($rootScope, ERR) {
  $rootScope.ui = $rootScope.ui || { main: {} }

  // takes data embeded on a page and puts it on the angular (root)scope
  if (window.pageData)
  {
    var session = window.pageData.session
    // if (d.tag) $rootScope.tag = d.tag

    if (session) {
      session.unauthenticated =
        (session.authenticated != null && session.authenticated == false)

      $rootScope.session = session
    }

    delete window.pageData
  }


  return {
    ERR: ERR,
    main(scope, opts) {
      opts = opts || {}
      if (opts.loading !== false)
        $rootScope.ui.main.loading = true

      if (opts.util) scope.util = scope.util || {}
      Object.keys(opts.util||{}).forEach(n => scope.util[n] = opts.util[n] )

      Object.keys(opts.data||{}).forEach(key => scope[key] = opts.data[key] )

      return {
        toggleLoading(show) {
          if (show === false) $rootScope.ui.main.loading = false
          else if (show) $rootScope.ui.main.loading = true
          else $rootScope.ui.main.loading = !$rootScope.ui.main.loading
        },
        setData(data) {
          $rootScope.ui.main.loading = false
          Object.keys(data).forEach(key => scope[key] = data[key])
        },
        setFormData(set) {
          return (data) => {
            this.setData(data)
            set(data)
          }
        },
      }
    }
  }

})




.run(function(PAGE) {
  // console.log('PAGE run sets up the factory before anything else')
})
