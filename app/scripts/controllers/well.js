'use strict';

/**
 * @ngdoc function
 * @name nationalMapApp.controller:WellCtrl
 * @description
 * # WellCtrl
 * Controller of the nationalMapApp
 */
angular.module('nationalMapApp')
  .controller('WellCtrl', ['$scope', 'well', function ($scope, well) {
    $scope.well = well;
  }]);
