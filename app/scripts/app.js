'use strict';

/**
 * @ngdoc overview
 * @name nationalMapApp
 * @description
 * # nationalMapApp
 *
 * Main module of the application.
 */
angular
  .module('nationalMapApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive'
  ])
  .config(function ($routeProvider) {

    var variables = {
      wells: {
        storage: 'type_add7d89299a740959c5b4700bcb4668e'
      }
    };
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        reloadOnSearch: false,
        controller: 'MainCtrl'
      })
      .when('/well/:featureId', {
        templateUrl: 'views/well.html',
        controller: 'WellCtrl',
        resolve: {
          well: function(Well, $route) {
            return Well.get({
              storage: variables.wells.storage,
              featureId: $route.current.params.featureId
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
