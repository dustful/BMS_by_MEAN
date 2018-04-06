// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var path = require('path'),
    Book = require('./book.server.controller'),
    Order = require('./order.server.controller'),
    Board = require('./board.server.controller'),
    Member = require('./member.server.controller');

module.exports = function(app) {
    app.route('/api/book')
        .get(Book.list)
        .post(Book.write);

    app.route('/api/book/:book_id')
        .get(Book.detail)
        .put(Book.modify)
        .delete(Book.delete);

    app.route('/api/order')
        .get(Order.list);
        
    app.route('/api/order/:order_id')
        .get(Order.detail)
        .post(Order.write)
        .put(Order.modify)
        .delete(Order.delete);

    app.route('/api/board')
        .get(Board.list)
        .post(Board.write);
        
    app.route('/api/board/:board_id')
        .get(Board.detail)
        .put(Board.modify)
        .delete(Board.delete);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/views/index.html'));
    });
};