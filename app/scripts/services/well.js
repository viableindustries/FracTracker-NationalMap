'use strict';

/**
 * @ngdoc service
 * @name nationalMapApp.Well
 * @description
 * # Well
 * Provider in the nationalMapApp.
 */
angular.module('nationalMapApp')
  .provider('Well', function () {

    this.$get = ['$resource', function ($resource) {

      var Well = $resource('//api.commonscloud.org/v2/:storage.json', {}, {
        query: {
          method: 'GET',
          params: {
            statistics: false,
            relationship: false
          },
          isArray: false,
          transformResponse: function (data, headersGetter) {
            return angular.fromJson(data);
          }
        },
        get: {
          method: 'GET',
          url: '//api.commonscloud.org/v2/:storage/:featureId.json'
        }
      });

      // Well.getWell = function(options) {
      //   console.log('options', options);

      //   var promise = Well.get(options).$promise.then(function(response) {
      //     return response;
      //   });

      //   return promise;
      // };

      return Well;

    }];  

  });

