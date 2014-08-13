'use strict';

angular.module('honoursApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'btford.socket-io',
    'ui.router',
    'angular-medium-editor',
    'restangular',
    'monospaced.elastic',
    'angularFileUpload'
])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                if (!config.url.startsWith('https')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.absUrl = $location.absUrl();
    $rootScope.$on('$stateChangeStart', function(event, next) {
        if (next.authenticate && !Auth.isLoggedIn()) {
            $location.path('/login');
        }
    });
});




if (typeof(String.prototype.startsWith) === 'undefined') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) === str;
    };
}

if (typeof(String.prototype.endsWith) === 'undefined') {
    String.prototype.endsWith = function(str) {
      console.log(this.substr(this.lastIndexOf('.')));
      return this.substr(this.lastIndexOf('.')) === str;
    };
}