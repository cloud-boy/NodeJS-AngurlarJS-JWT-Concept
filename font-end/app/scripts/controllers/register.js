'use strict';

/**
 * @ngdoc function
 * @name jwtTraiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtTraiApp
 */


angular.module('jwtTraiApp')
    .controller('RegisterCtrl', ['$scope', '$auth', 'notifFactory',
        function($scope, $auth, notifFactory) {

            $scope.auth = function() {
                $auth.signup({
                    displayName : $scope.displayName,
                    email : $scope.email,
                    password : $scope.password
                }).then(function(response) {
                    notifFactory.onSuccess('Account Created', 'Welcome ' + response.data.user.displayName + ' !');
                }).catch(function(error) {
                    notifFactory.onError(error.message);
                });
            };
        }
    ]);
