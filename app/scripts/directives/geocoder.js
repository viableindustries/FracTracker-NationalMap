'use strict';

angular.module('nationalMapApp')
	.directive('geocoder', ['$http', '$log', function($http, $log){

		var link = function(scope){
			scope.geocoder = '';
			scope.geocodeFeatures = [];

			scope.initGeocoder = function(){
				var requestedLocation = scope.geocoder;
				var geocodeServiceUrl = '//api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/' + requestedLocation + '.json';

				$http({
					method: 'GET',
					url: geocodeServiceUrl,
					params: {
						'callback': 'JSON_CALLBACK',
						'access_token': 'pk.eyJ1IjoiZGV2ZWxvcGVkc2ltcGxlIiwiYSI6Il9aYmF0eWMifQ.IKV2X58Q7rhaqVBEKPbJMw'
					}
				}).success(function(data){
					scope.geocodeFeatures = data.features;
				}).error(function(){
					$log.log('Error');
				});
			};

			scope.getSelectedProperty = function(prop){
				scope.selectedProperty = prop;
				scope.geocoder = prop.place_name;
				scope.geocodeFeatures = [];
			};
		};

		return {
			scope: {
				selectedProperty: '='
			},
			restrict: 'E',
			templateUrl: '/partials/includes/geocoder.html',
			link: link
		};
	}]);