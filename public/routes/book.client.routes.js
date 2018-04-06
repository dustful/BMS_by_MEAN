(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('book')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                // 구매자 상품 목록
                .when('/book/list', {
                    templateUrl: 'views/book/book.guest.list.html',
                    controller: 'bookListCtrl'
                })
                // 구매자 상품 상세
                .when('/book/detail/:book_id', {
                    templateUrl: 'views/book/book.guest.detail.html',
                    controller: 'bookDetailCtrl'
                })
                // 판매자 재고 목록
                .when('/book/host/list', {
                    templateUrl: 'views/book/book.host.list.html',
                    controller: 'bookHostListCtrl'
                })
                // 판매자 재고 상세
                .when('/book/host/detail/:book_id', {
                    templateUrl: 'views/book/book.host.detail.html',
                    controller: 'bookHostDetailCtrl'
                })
                // 판매자 상품 입고
                .when('/book/host/write', {
                    templateUrl: 'views/book/book.host.write.html',
                    controller: 'bookHostWriteCtrl'
                })
                // 판매자 상품 정보 수정
                .when('/book/host/modify/:book_id', {
                    templateUrl: 'views/book/book.host.modify.html',
                    controller: 'bookHostModifyCtrl'
                })
                .otherwise({
                    redirectTo: '/book/list'
                });

            $locationProvider.html5Mode(true);
        })
        .controller('bookListCtrl', ['$scope', 'bookService', BookListCtrl])
        .controller('bookDetailCtrl', ['$scope', 'bookService', '$routeParams', '$location', BookDetailCtrl])
        .controller('bookHostListCtrl', ['$scope', 'bookService', BookHostListCtrl])
        .controller('bookHostDetailCtrl', ['$scope', 'bookService', '$routeParams', '$location', BookHostDetailCtrl])
        .controller('bookHostWriteCtrl', ['$scope', '$location', 'bookService', BookHostWriteCtrl])
        .controller('bookHostModifyCtrl', ['$scope', 'bookService', '$routeParams', '$location', BookHostModifyCtrl]);

        // 구매자 상품 목록
        function BookListCtrl($scope, bookService) {
            $scope.selection = false;
            $scope.message = '';

            bookService.getBooks().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '입고된 상품이 없습니다.';
                } else {
                    $scope.bookData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        // 구매자 상품 상세
        function BookDetailCtrl($scope, bookService, $routeParams, $location) {
            bookService.getBook($routeParams.book_id).then(function(data) {
                $scope.bookData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });
        }

        // 판매자 재고 목록
        function BookHostListCtrl($scope, bookService) {
            $scope.selection = false;
            $scope.message = '';

            bookService.getBooks().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '입고된 상품이 없습니다.';
                } else {
                    $scope.bookData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        // 판매자 재고 상세
        function BookHostDetailCtrl($scope, bookService, $routeParams, $location) {
            bookService.getBook($routeParams.book_id).then(function(data) {
                $scope.bookData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.deleteBook = function() {
                bookService.deleteBook($routeParams.book_id).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/book/host/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }

        // 판매자 상품 입고
        function BookHostWriteCtrl($scope, $location, bookService) {
            $scope.saveBook = function() {
                bookService.postBook($scope.bookData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/book/host/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }

        // 판매자 상품 정보 수정
        function BookHostModifyCtrl($scope, bookService, $routeParams, $location) {
            bookService.getBook($routeParams.book_id).then(function(data) {
                $scope.bookData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.updateBook = function() {
                bookService.putBook($scope.bookData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/book/host/detail/' + $routeParams.book_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }
})();