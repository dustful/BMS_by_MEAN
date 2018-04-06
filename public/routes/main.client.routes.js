(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('main')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'mainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        })
        .controller('mainCtrl', function($scope) {

        });
})();