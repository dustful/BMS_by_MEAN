(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('board')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/board/list', {
                    templateUrl: 'views/board/board.list.html',
                    controller: 'boardListCtrl'
                })
                .when('/board/write', {
                    templateUrl: 'views/board/board.write.html',
                    controller: 'boardWriteCtrl'
                })
                .when('/board/detail/:board_id', {
                    templateUrl: 'views/board/board.detail.html',
                    controller: 'boardDetailCtrl'
                })
                .when('/board/modify/:board_id', {
                    templateUrl: 'views/board/board.modify.html',
                    controller: 'boardModifyCtrl'
                })
                .otherwise({
                    redirectTo: '/board/list'
                });

            $locationProvider.html5Mode(true);
        })
        .controller('boardListCtrl', ['$scope', 'boardService', BoardListCtrl])
        .controller('boardWriteCtrl', ['$scope', '$location', 'boardService', BoardWriteCtrl])
        .controller('boardDetailCtrl', ['$scope', 'boardService', '$routeParams', '$location', BoardDetailCtrl])
        .controller('boardModifyCtrl', ['$scope', 'boardService', '$routeParams', '$location', BoardModifyCtrl]);

        function BoardListCtrl($scope, boardService) {
            $scope.selection = false;
            $scope.message = '';

            boardService.getBoards().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '작성된 게시물이 하나도 없습니다.';
                } else {
                    $scope.boardData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        function BoardWriteCtrl($scope, $location, boardService) {
            $scope.saveBoard = function() {
                boardService.postBoard($scope.boardData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/board/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }

        function BoardDetailCtrl($scope, boardService, $routeParams, $location) {
            boardService.getBoard($routeParams.board_id).then(function(data) {
                $scope.boardData = data;

                $scope.selection = false;
                $scope.message = '';

                if(data.reply.length < 1) {
                    $scope.message = '작성된 댓글이 하나도 없습니다.';
                } else {
                    $scope.selection = true;
                }
            });

            $scope.deleteBoard = function() {
                boardService.deleteBoard($routeParams.board_id).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/board/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };

            // 점검중
            $scope.writeReply = function() {
                boardService.putBoard($scope.boardData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/board/detail/' + $routeParams.board_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }

        function BoardModifyCtrl($scope, boardService, $routeParams, $location) {
            boardService.getBoard($routeParams.board_id).then(function(data) {
                $scope.boardData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.updateBoard = function() {
                boardService.putBoard($scope.boardData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/board/detail/' + $routeParams.board_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }
})();