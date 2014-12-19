'use strict';

/**
 * @ngdoc function
 * @name nationalMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nationalMapApp
 */
angular.module('nationalMapApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', 'Site', 'Map', 'leafletData', 'leafletEvents', function ($scope, $http, $location, Site, Map, leafletData, leafletEvents) {

    $scope.settings = Site.settings();

    $scope.map = Map.create();

    $scope.map.update = function(map) {
        var _zoom = map.getZoom();

        switch (_zoom) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            //
            // If the user zoom out beyond 15 then we want to clear the Marker variable so that nothing
            // on the map is clickable from an unrecognizable zoom level. We set the $scope.map.markers
            // variable to be an empty object to disable the interaction.
            //
            angular.copy($scope.map.markers, $scope.tmp)
            $scope.map.markers = {};
            break;
          default:
            if ($scope.tmp !== undefined) {
              angular.copy($scope.tmp, $scope.map.markers)
            }

            var bounds = map.getBounds();

            Map.getData(bounds).then(function(response) {
              $scope.map.markers = Map.getMarkers(response);
            });
            break;
        }

        var center = map.getCenter();

        $location.search({
          zoom: _zoom,
          lat: center.lat,
          lng: center.lng
        });
    };

    leafletData.getMap().then(function(map) {

      //
      // Default map center and zoom level when the page loads
      //
      var defaults = $location.search(),
          zoom = (defaults.zoom) ? defaults.zoom : 4,
          lat = (defaults.lat) ? defaults.lat : 39.147,
          lng = (defaults.lng) ? defaults.lng : -96.812;

      map.setView({
        lat: lat, 
        lng: lng
      }, zoom);

      $scope.$on('leafletDirectiveMarker.click', function(event, args) {
        $location.path($scope.map.markers[args.markerName].permalink);
      });

      if (map.getZoom() > 14) {
        $scope.map.update(map);
      }

      //
      // We need to have our application pay special attention to map moves so that once we breach
      // the 15 level zoom mark we can safely begin polling the API to give us details about the wells
      // being currently displayed
      //
      $scope.$on('leafletDirectiveMap.moveend', function(event, leafletEvent){
        $scope.map.update(map);
      });

      new L.Control.Zoom({
        position: 'bottomright'
      }).addTo(map);

      map.addControl(L.mapbox.geocoderControl('mapbox.places-v1', {
          autocomplete: true,
          keepOpen: true
      }));

    });

  }]);
