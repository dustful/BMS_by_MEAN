(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('order')
        .factory('orderFactory', ['$resource', function($resource) {
            return $resource('api/order/:order_id', {order_id: '@_id'},
                {
                    update: {method: 'PUT'},
                    get: {isArray: false},
                    query: {isArray: false}
                }
            );
        }]);
})();