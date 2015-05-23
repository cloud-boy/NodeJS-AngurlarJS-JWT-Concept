'use strict';

/**
 * @ngdoc function
 * @name jwtTraiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jwtTraiApp
 */
angular.module('jwtTraiApp')
  .controller('LoginCtrl', ['$scope', 'authFactory', 'notifFactory', '$state', '$auth',
      function ($scope, authFactory, notifFactory, $state, $auth) {

    $scope.login = function(){
      $auth.login({
        email    : $scope.email,
        passport : $scope.password
      }).then(function (response){
            notifFactory.onSuccess('Logged In', 'Welcome back ' + response.user.displayName  + ' !');
      }).catch(handleError);
    };

    $scope.authenticate = function(provider){
      $auth.authenticate(provider).then(function (response){
            notifFactory.onSuccess('Logged In', 'Welcome back ' + response.data.user.displayName  + ' !');
      }, handleError);
    };

    function handleError (error) {
        notifFactory.onError('Something went wrong !', error.message + ' !');
    }

  }]);
