(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('order')
        .service('orderService', ['orderFactory', function(orderFactory) {
            this.getOrders = getOrders;
            this.getOrder = getOrder;
            this.postOrder = postOrder;
            this.putOrder = putOrder;
            this.deleteOrder = deleteOrder;

            function getOrders() {
                return orderFactory.query().$promise;
            }

            function getOrder(_id) {
                return orderFactory.get({order_id: _id}).$promise;
            }

            function postOrder(createData) {
                var order = new orderFactory(createData);
                return order.$save();
            }

            function putOrder(updateData) {
                var order = new orderFactory(updateData);
                return order.$update();
            }

            function deleteOrder(_id) {
                var order = new orderFactory();
                return order.$delete({order_id: _id});
            }
        }]);
})();