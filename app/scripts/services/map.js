'use strict';

/**
 * @ngdoc service
 * @name nationalMapApp.map
 * @description
 * # map
 * Service in the nationalMapApp.
 */
angular.module('nationalMapApp')
  .service('Map', function Map(Site, $http) {

    var Map = {};

    Map.create = function() {
      return {
        markers: {}, // Empty for now because we're not loading them until the region is appropriate
        defaults: {
          scrollWheelZoom: false,
          zoomControl: false,
          maxZoom: 20
        },
        layers: {
          baselayers: {
            basemap: {
              name: 'Satellite Imagery',
              url: '//{s}.tiles.mapbox.com/v4/' + Site.settings().services.mapbox.map_id + '/{z}/{x}/{y}.png?access_token=' + Site.settings().services.mapbox.access_token,
              type: 'xyz',
              layerOptions: {
                attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a>"
              }
            }
          },
          overlays: {
            wells: {
              name: 'Wells',
              type: 'xyz',
              url: 'https://{s}.tiles.mapbox.com/v4/developedsimple.b3a9ad79/{z}/{x}/{y}.png?access_token=' + Site.settings().services.mapbox.access_token,
              visible: true
            }
          }
        }
      }
    };

    Map.getMarkers = function(response) {

      var markers = {};
      
      //
      // Build our markers so we can pass it off to the map directive
      //
      angular.forEach(response.data.features, function(feature) {
        markers[feature.properties.id] = {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
            focus: false,
            draggable: false,
            permalink: '/well/' + feature.properties.id,
            message: '<p>' + feature.properties.well_name + '<br /><span>' + feature.properties.api + '</span></p>',
            icon: {
              type: 'div',
              className: 'marker-container-default',
              iconSize: [16, 16],
              popupAnchor: [0, -16]
            }
        };
      });

      return markers;
    };

    Map.getRegion = function(bounds) {

      var b = L.latLngBounds(bounds),
          northWest = b.getWest() + ' ' + b.getNorth(),
          northEast = b.getEast() + ' ' + b.getNorth(),
          southEast = b.getEast() + ' ' + b.getSouth(),
          southWest = b.getWest() + ' ' + b.getSouth(),
          region = 'SRID=4326;POLYGON((' + northWest + ',' + northEast + ',' + southEast + ',' + southWest + ',' + northWest + '))',
          url = 'http://api.commonscloud.org/v2/type_add7d89299a740959c5b4700bcb4668e/region.geojson?geometry=' + region;

      return url;
    };

    Map.getData = function(bounds) {

      var region = Map.getRegion(bounds);

      var promise = $http.get(region).
        success(function(data, status, headers, config) {
          return data;
        }).
        error(function(data, status, headers, config) {
          console.error(data, status, headers, config);
        });

      return promise;
    };

    return Map;
  });
