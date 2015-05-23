'use strict';

/**
 * @ngdoc service
 * @name jwtTraiApp.authToken
 * @description
 * # authToken
 * Factory in the jwtTraiApp.
 */
angular.module('jwtTraiApp')
  .factory('authToken', ['$window', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';
    // Public API here
    var authToken = {
      setToken : function (token){
        cachedToken = token;
        storage.setItem(userToken, token);
      },

      getToken : function () {
        if (!cachedToken) {
          cachedToken = storage.getItem(userToken);
        }
        return cachedToken;
      },

      removeToken : function(){
        cachedToken = null;
        if(storage.getItem(userToken)){
          storage.removeItem(userToken);
        }
      },

      isAuthenticated : function(){
        return !!authToken.getToken();
      }
    };

    return authToken;
  }]);
