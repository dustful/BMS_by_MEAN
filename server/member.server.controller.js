// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var Member = require('./member.server.model');

// 목록 열람 처리
exports.list = function(req, res, next) {
    var select = {
        subject: 1,
        writer: 1,
        hit: 1,
        regdate: 1
    };
    var where = {};

    Member.find(where, select).sort({regdate: -1}).exec(function(err, result) {
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
    var member = new Member();

    member.subject = req.body.subject;
    member.writer = req.body.writer;
    member.content = req.body.content;

    member.save(function(err, result) {
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
    Member.findById(req.params.member_id).exec(function(err, result) {
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
    Member.findByIdAndUpdate(req.params.member_id,
    {
        subject: req.body.subject,
        writer: req.body.writer,
        content: req.body.content
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
    Member.findByIdAndRemove(req.params.member_id, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};