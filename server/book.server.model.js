// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var config = require('./server.config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 스키마 정의
var BookSchema = new Schema({
    bookname: {type: String},
    author: {type: String},
    publisher: {type: String},
    price: {type: Number, default: 0},
    qty: {type: Number, default: 0},
    recommendation: {type: Boolean, default: false},
    introduction: {type: String},
    regdate: {type: Date, default: Date.now}
});

// 모델 등록
var Book = config.model('Book', BookSchema);

module.exports = Book;