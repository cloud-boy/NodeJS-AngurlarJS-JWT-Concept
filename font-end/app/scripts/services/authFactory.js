'use strict';

/**
 * @ngdoc service
 * @name jwtTraiApp.authenticationFactory
 * @description
 * # authenticationFactory
 * Factory in the jwtTraiApp.
 */
angular.module('jwtTraiApp')
  .factory('authFactory', ['$http', 'CONFIG', 'authToken', '$window', '$q', '$state', function ($http, CONFIG, authToken, $window, $q, $state) {

      var urlBuilder = [];
      var clientId = '659856002444-dmjb5orl0sicql91549kfu7u5ma7j6kd.apps.googleusercontent.com';
      urlBuilder.push('response_type=code',
        'client_id='+clientId,
        'redirect_uri='+ window.location.origin,
        'scope=profile email');

     function authSuccess (response) {
          authToken.setToken(response.token);
          $state.go('main');
     }

    // Public API here
    return {
      register : function(fname, lname, email, pass){
        return $http.post(CONFIG.API_URL+'/register', {fname: fname, lname: lname, email: email, password: pass})
          .success(authSuccess);
      },

      login : function(email, pass){
        return $http.post(CONFIG.API_URL+'/login', {email: email, password: pass}).success(authSuccess);
      },

      googleAuth: function(){
         var url = 'https://accounts.google.com/o/oauth2/auth?'+urlBuilder.join('&');
         var options = 'width=500, height=500, left='+ ($window.outerWidth -500) / 2 +
           ',top='+ ($window.outerHeight -500) /2.5;

         var deferred = $q.defer();


         var popeup = $window.open(url, '', options);
         $window.focus();
         $window.addEventListener('message', function (event){
            if(event.origin === $window.location.origin ){
              var authCode = event.data;
              popeup.close();
              $http.post(CONFIG.API_URL+'/auth/google', {
                code       : authCode,
                clientId   : clientId,
                redirectUri: $window.location.origin
              }).success(function (jwt){
                authSuccess(jwt);
                deferred.resolve(jwt);
              });
            }
         });

         return deferred.promise;
      }

    };

}]);
