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
    $scope.well_raw = JSON.stringify(well.response, null, "    ");
    $scope.well = well.response;
  }]);