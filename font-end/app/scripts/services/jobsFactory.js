'use strict';

/**
 * @ngdoc service
 * @name jwtTraiApp.jobs
 * @description
 * # jobs
 * Factory in the jwtTraiApp.
 */
angular.module('jwtTraiApp')
  .factory('jobsFactory', ['$http', function ($http) {


    // Public API here
    return {
      getJobs : function(url){
        return $http.get(url);
      }
    };
  }]);
