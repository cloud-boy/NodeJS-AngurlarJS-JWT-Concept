'use strict';

/**
 * @ngdoc service
 * @name jwtTraiApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the jwtTraiApp.
 */
angular.module('jwtTraiApp')
  .factory('authInterceptor', ['authToken', function (authToken) {

    return {
      request : function(config){
        var token = authToken.getToken();
        if(token){
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },

      response : function(response) {
        return response;
      }
    };
  }]);
