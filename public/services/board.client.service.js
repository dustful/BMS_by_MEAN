(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('board')
        .factory('boardFactory', ['$resource', function($resource) {
            return $resource('api/board/:board_id', {board_id: '@_id'},
                {
                    update: {method: 'PUT'},
                    get: {isArray: false},
                    query: {isArray: false}
                }
            );
        }]);
})();