'use strict';

angular.module('jwtTraiApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 'CONFIG',
    function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, CONFIG) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'JobsCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            });

        $authProvider.google({
            clientId: '659856002444-dmjb5orl0sicql91549kfu7u5ma7j6kd.apps.googleusercontent.com',
            url: CONFIG.API_URL + '/auth/google'
        });
        $authProvider.facebook({
            clientId: '377794562381015',
            url: CONFIG.API_URL + '/auth/facebook'
        });

        $authProvider.loginUrl = CONFIG.API_URL + '/login';
        $authProvider.signupUrl = CONFIG.API_URL + '/register';

        $httpProvider.interceptors.push('authInterceptor');

    }
])
    .run(function($window) {
        var params = $window.location.search.substring(1);
        if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);
            $window.opener.postMessage(code, $window.location.origin);
        }
    });