'use strict';

/**
 * @ngdoc function
 * @name jwtTraiApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the jwtTraiApp
 */
angular.module('jwtTraiApp')
  .controller('LogoutCtrl', ['$auth', '$state', 'notifFactory', function ($auth, $state, notifFactory) {
    $auth.logout();
    $state.go('main');
    notifFactory.onSuccess('See Ya !', 'Hope to see you soon !');
  }]);
