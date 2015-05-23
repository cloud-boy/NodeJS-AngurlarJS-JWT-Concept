'use strict';

/**
 * @ngdoc function
 * @name jwtTraiApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtTraiApp
 */
angular.module('jwtTraiApp')
  .controller('JobsCtrl', ['$scope', 'jobsFactory', 'notifFactory','CONFIG',
      function ($scope, jobsFactroy , notifFactory, CONFIG) {
     jobsFactroy.getJobs(CONFIG.API_URL+ '/jobs')
       .success(function(jobs){
         notifFactory.onSuccess('Getting Results', 'Current available jobs received');
         $scope.jobs = jobs;
       })
       .error(function(err){
          notifFactory.onError('Error', 'Unable to get the jobs ');
       });
  }]);
