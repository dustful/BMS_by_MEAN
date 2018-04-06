(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('book')
        .factory('bookFactory', ['$resource', function($resource) {
            return $resource('api/book/:book_id', {book_id: '@_id'},
                {
                    update: {method: 'PUT'},
                    get: {isArray: false},
                    query: {isArray: false}
                }
            );
        }]);
})();