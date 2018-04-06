// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var Order = require('./order.server.model');

// 주문
exports.write = function(req, res, next) {
    var order = new Order();

    order.product = req.body.product;
    order.oqty = req.body.oqty;
    order.ordername = req.body.ordername;
    order.ordercontact = req.body.ordercontact;
    order.receivername = req.body.receivername;
    order.receivercontact = req.body.receivercontact;
    order.receiveraddr = req.body.receiveraddr;

    order.save(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};

// 주문 목록
exports.list = function(req, res, next) {
    var select = {
        _id: 1,
        price: 1,
        regdate: 1
    };
    var where = {};

    Order.find(where, select).sort({regdate: -1}).exec(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: result});
        }
    });
};

// 주문 상세
exports.detail = function(req, res, next) {
    Order.findById(req.params.order_id).exec(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp(result);
        }
    });
};

// 주문 정보 수정
exports.modify = function(req, res, next) {
    Order.findByIdAndUpdate(req.params.order_id,
    {
        status: req.body.status
    }, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};

// 주문 취소
exports.delete = function(req, res, next) {
    Order.findByIdAndRemove(req.params.order_id, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};