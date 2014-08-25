'use strict';

angular.module('nationalMapApp')
.controller('MapCtrl', ['$scope', '$log', 'leafletData', function($scope, $log, leafletData){

	$scope.hasAddress = false;
	$scope.selectedProperty = {
		value: ''
	};
	$scope.measurements = {
		current: 'Acres',
		values: [
			{
				name: 'Acres'
			},
			{
				name: 'Hectares'
			},
			{
				name: 'Square Feet'
			}
		]
	};
	$scope.templateUrl = '/partials/map.html';
	$scope.property = {
		address: '',
		area: 0.30,
		areas: {
			buildings: {
				name: 'Buildings',
				id: 'building',
				idP: 'plannedBuildings',
				value: 1612
			},
			impervious: {
				name: 'Other Impervious Surfaces',
				id: 'impervious',
				idP: 'plannedImpervious',
				value: 814
			},
			canopy: {
				name: 'Tree Canopy',
				id: 'canopy',
				idP: 'plannedCanopy',
				value: 4261
			},
			lawn: {
				name: 'Lawn',
				id: 'lawn',
				idP: 'plannedLawn',
				value: 6689
			},
			planted: {
				name: 'Planted Beds',
				id: 'planted',
				idP: 'plannedPlanted',
				value: 0
			},
			downspouts: {
				name: 'Number of Downspouts',
				id: 'downspouts',
				idP: 'plannedDownspouts',
				value: 4
			}
		}
	};

	$scope.getPercentage = function(value){
		var total = $scope.property.areas.buildings.value + $scope.property.areas.impervious.value + $scope.property.areas.canopy.value + $scope.property.areas.lawn.value + $scope.property.areas.planted.value;

		return Math.round(value / total * 100);
	};

	$scope.setMeasurement = function(measurement){
		var previous = $scope.measurements.current;

		$scope.measurements.current = measurement;

		if(measurement === 'Square Feet'){
			if(previous === 'Acres'){
				$scope.property.area = $scope.property.area * 43560;
			} else {
				$scope.property.area = $scope.property.area * 107639;
			}
		} else if(measurement === 'Hectares'){
			if(previous === 'Acres'){
				$scope.property.area = $scope.property.area * 0.404686;
			} else {
				$scope.property.area = $scope.property.area / 107639;
			}
		} else {
			if(previous === 'Hectares'){
				$scope.property.area = $scope.property.area * 2.4711;
			} else {
				$scope.property.area = $scope.property.area / 43560;
			}
		}
	};

	$scope.clear = function(){
		$scope.hasAddress = false;

		leafletData.getMap().then(function(map){
			map.setView([38.904, -76.789], 9);
			map.fitBounds(map.getBounds());
		});
	};

	var createMap = function(){
		$scope.defaults = {
			tileLayer: 'https://{s}.tiles.mapbox.com/v3/developedsimple.j74la741/{z}/{x}/{y}.png',
			tileLayerOptions: {
				detectRetina: true,
				reuseTiles: true,
			},
			scrollWheelZoom: false,
			zoomControl: false
		};

		leafletData.getMap().then(function(map) {

			map.setView([39.50, -98.65], 5);

			map.fitBounds(map.getBounds());

			new L.Control.Zoom({
			  position: 'bottomright'
			}).addTo(map);
		});
	};

	var centerMapOnGeocode = function(result){
		$scope.hasAddress = true;

		leafletData.getMap().then(function(map){
			map.setView([result.center[1], result.center[0]], 18);
			map.fitBounds(map.getBounds());
		});
	};

	$scope.$watch('selectedProperty.value', function(newValue){
		if(newValue !== ''){
			centerMapOnGeocode(newValue);
			$scope.property.address = newValue.address + ' ' + newValue.text;
		}
	});

	createMap();

}]);