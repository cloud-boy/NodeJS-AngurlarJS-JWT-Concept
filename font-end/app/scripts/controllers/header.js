'use strict';

/**
 * @ngdoc function
 * @name jwtTraiApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the jwtTraiApp
 */
angular.module('jwtTraiApp')
  .controller('HeaderCtrl', ['$scope' ,'$auth', function ($scope, $auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;
  }]);
