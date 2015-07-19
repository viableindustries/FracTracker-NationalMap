'use strict';

/**
 * @ngdoc directive
 * @name nationalMapApp.directive:geocoder
 * @description
 * # geocoder
 */
angular.module('nationalMapApp')
  .directive('geocoder', function ($timeout, $http, Site, leafletData) {
    return {
      scope: {
      	map: '=',
      	close: '='
      },
      templateUrl: '/views/geocoder-form.html',
      restrict: 'E',
      replace: 'true',
      link: function postLink(scope, element, attrs) {
      	var timeout, location, geocodeUrl;
      	var settings = Site.settings();

      	scope.plan = {};

      	function initGeocoder() {
      		location = scope.plan.address;
      		geocodeUrl = '//api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/' + location + '.json';

      		if(location.length >= 3) {
      			$http({
      				method: 'get',
      				url: geocodeUrl,
      				params: {
      					'callback': 'JSON_CALLBACK',
      					'access_token': settings.services.mapbox.access_token
      				}
      			}).success(function(data) {
      				scope.features = data.features;
                              console.log(data.features);
      			}).error(function(data) {
      				console.log('Error: ', data);
      			});
      		}
      	}

      	scope.clear = function() {
      		scope.features = [];
      	};

      	scope.searchAddress = function() {
      		$timeout.cancel(timeout);

      		timeout = $timeout(function() {
      			initGeocoder();
      		}, 800);
      	};

      	scope.selectCoordinate = function(geocode) {
			leafletData.getMap().then(function(map) {
				map.setView({
					lat: geocode.center[1],
					lng: geocode.center[0]
				}, 16);
			});

			scope.plan.address =
					geocode.address + ' ' + geocode.text + ' ' + geocode.context[0].text + ', ' + geocode.context[2].text;

      		scope.features = [];

      		scope.close();

      		$timeout(function() {
      			leafletData.getMap().then(function(map) {
      				map.invalidateSize();
      			});
      		}, 200);
      	};
      }
    };
  });
