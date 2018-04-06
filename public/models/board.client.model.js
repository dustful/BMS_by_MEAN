(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('board')
        .service('boardService', ['boardFactory', function(boardFactory) {
            this.getBoards = getBoards;
            this.getBoard = getBoard;
            this.postBoard = postBoard;
            this.putBoard = putBoard;
            this.deleteBoard = deleteBoard;

            function getBoards() {
                return boardFactory.query().$promise;
            }

            function getBoard(_id) {
                return boardFactory.get({board_id: _id}).$promise;
            }

            function postBoard(createData) {
                var board = new boardFactory(createData);
                return board.$save();
            }

            function putBoard(updateData) {
                var board = new boardFactory(updateData);
                return board.$update();
            }

            function deleteBoard(_id) {
                var board = new boardFactory();
                return board.$delete({board_id: _id});
            }
        }]);
})();