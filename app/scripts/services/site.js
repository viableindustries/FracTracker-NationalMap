'use strict';

/**
 * @ngdoc service
 * @name cleanWaterCommunitiesApp.Site
 * @description
 * # Site
 * Service in the cleanWaterCommunitiesApp.
 */
angular.module('nationalMapApp')
  .service('Site', function Site() {
    
    var self = {};

    self.settings = function() {
      return {
        services: {
          mapbox: {
            access_token: 'pk.eyJ1IjoiZGV2ZWxvcGVkc2ltcGxlIiwiYSI6IlROYnA5TVkifQ.xYWYVuOeP4wUli32Bnx3cA',
            map_id: 'developedsimple.khc9mj09'
          }
        }
      };
    };

    return self;
  });
