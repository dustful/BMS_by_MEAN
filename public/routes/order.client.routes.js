(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('order')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                // 구매자 주문 목록
                .when('/order/list', {
                    templateUrl: 'views/order/order.guest.list.html',
                    controller: 'orderListCtrl'
                })
                // 구매자 주문 상세
                .when('/order/detail/:order_id', {
                    templateUrl: 'views/order/order.guest.detail.html',
                    controller: 'orderDetailCtrl'
                })
                // 판매자 주문 목록
                .when('/order/host/list', {
                    templateUrl: 'views/order/order.host.list.html',
                    controller: 'orderHostListCtrl'
                })
                // 판매자 주문 상세
                .when('/order/host/detail/:order_id', {
                    templateUrl: 'views/order/order.host.detail.html',
                    controller: 'orderHostDetailCtrl'
                })
                // 구매자 주문
                .when('/order/write/:order_id', {
                    templateUrl: 'views/order/order.guest.write.html',
                    controller: 'orderWriteCtrl'
                })
                // 구매자 주문 정보 수정
                .when('/order/host/modify/:order_id', {
                    templateUrl: 'views/order/order.host.modify.html',
                    controller: 'orderHostModifyCtrl'
                })
                .otherwise({
                    redirectTo: '/order/list'
                });

            $locationProvider.html5Mode(true);
        })
        .controller('orderListCtrl', ['$scope', 'orderService', OrderListCtrl])
        .controller('orderDetailCtrl', ['$scope', 'orderService', '$routeParams', '$location', OrderDetailCtrl])
        .controller('orderHostListCtrl', ['$scope', 'orderService', OrderHostListCtrl])
        .controller('orderHostDetailCtrl', ['$scope', 'orderService', '$routeParams', '$location', OrderHostDetailCtrl])
        .controller('orderWriteCtrl', ['$scope', '$location', 'orderService', '$routeParams', 'bookService', OrderWriteCtrl])
        .controller('orderHostModifyCtrl', ['$scope', 'orderService', '$routeParams', '$location', OrderHostModifyCtrl]);

        // 구매자 주문 목록
        function OrderListCtrl($scope, orderService) {
            $scope.selection = false;
            $scope.message = '';

            orderService.getOrders().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '선택된 상품이 없습니다.';
                } else {
                    $scope.orderData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        // 구매자 주문 상세
        function OrderDetailCtrl($scope, orderService, $routeParams, $location) {
            orderService.getOrder($routeParams.order_id).then(function(data) {
                $scope.orderData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });
        }

        // 판매자 주문 목록
        function OrderHostListCtrl($scope, orderService) {
            $scope.selection = false;
            $scope.message = '';

            orderService.getOrders().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '선택된 상품이 없습니다.';
                } else {
                    $scope.orderData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        // 판매자 주문 상세
        function OrderHostDetailCtrl($scope, orderService, $routeParams, $location) {
            orderService.getOrder($routeParams.order_id).then(function(data) {
                $scope.orderData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.deleteOrder = function() {
                orderService.deleteOrder($routeParams.order_id).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/order/host/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }

        // 구매자 주문
        function OrderWriteCtrl($scope, $location, orderService, $routeParams, bookService) {
            bookService.getBook($routeParams.order_id).then(function(data) {
                $scope.orderData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.copyOrderInfo = function() {
                if($scope.chkInfo == true) {
                    $scope.orderData.receivername = $scope.orderData.ordername;
                    $scope.orderData.receivercontact = $scope.orderData.ordercontact;
                } else {
                    $scope.orderData.receivername = '';
                    $scope.orderData.receivercontact = '';
                }
            };

            $scope.saveOrder = function() {
                orderService.postOrder($scope.orderData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/book/completed');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }

        // 구매자 주문 정보 수정
        function OrderHostModifyCtrl($scope, orderService, $routeParams, $location) {
            orderService.getOrder($routeParams.order_id).then(function(data) {
                $scope.orderData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.updateOrder = function() {
                orderService.putOrder($scope.orderData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/order/host/detail/' + $routeParams.order_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };
        }
})();