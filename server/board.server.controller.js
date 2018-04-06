// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var Board = require('./board.server.model');

// 목록 열람 처리
exports.list = function(req, res, next) {
    var select = {
        subject: 1,
        writer: 1,
        hit: 1,
        regdate: 1
    };
    var where = {};

    Board.find(where, select).sort({regdate: -1}).exec(function(err, result) {
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
    var board = new Board();

    board.subject = req.body.subject;
    board.writer = req.body.writer;
    board.content = req.body.content;

    board.save(function(err, result) {
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
    Board.findById(req.params.board_id).exec(function(err, result) {
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
    Board.findByIdAndUpdate(req.params.board_id,
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
    Board.findByIdAndRemove(req.params.board_id, function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
};

// 댓글 열람 처리
exports.listReply = function(req, res, next) {
    var select = {
        writer: 1,
        content: 1,
        regdate: 1
    };
    var where = {};

    Board.find(where, select).sort({regdate: -1}).exec(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: result});
        }
    });
}

// 댓글 작성 처리
exports.writeReply = function(req, res, next) {
    var board = new Board();
    
    board.reply.writer = req.body.re_writer;
    board.reply.content = req.body._re_content;
    
    Board.save(function(err, result) {
        if(err) {
            err.status = 500;
            next(err);
        } else {
            res.jsonp({result: 'success'});
        }
    });
}