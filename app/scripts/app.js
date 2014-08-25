'use strict';

angular.module('nationalMapApp', [
	'ngResource',
	'ngRoute',
	'leaflet-directive'
])
.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main.html',
			controller: 'MapCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});