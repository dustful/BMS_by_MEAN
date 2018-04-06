// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var Book = require('./book.server.model');

// 목록 열람 처리
exports.list = function(req, res, next) {
    var select = {
        bookname: 1,
        author: 1,
        publisher: 1,
        price: 1,
        qty: 1
    };
    var where = {};

    Book.find(where, select).sort({regdate: -1}).exec(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: result});
        }
    });
};

// 작성 처리
exports.write = function(req, res, next) {
    var book = new Book();

    book.bookname = req.body.bookname;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.price = req.body.price;
    book.qty = req.body.qty;
    book.recommendation = req.body.recommendation;
    book.introduction = req.body.introduction;

    book.save(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};

// 상세 열람 처리
exports.detail = function(req, res, next) {
    Book.findById(req.params.book_id).exec(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp(result);
        }
    });
};

// 수정 처리
exports.modify = function(req, res, next) {
    Book.findByIdAndUpdate(req.params.book_id,
    {
        bookname: req.body.bookname,
        author: req.body.author,
        publisher: req.body.publisher,
        price: req.body.price,
        qty: req.body.qty,
        recommendation: req.body.recommendation,
        introduction: req.body.introduction
    }, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};

// 삭제 처리
exports.delete = function(req, res, next) {
    Book.findByIdAndRemove(req.params.book_id, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};