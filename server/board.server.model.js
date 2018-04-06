// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var config = require('./server.config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 스키마 정의
var BoardSchema = new Schema({
    subject: {type: String},
    writer: {type: String},
    content: {type: String},
    reply: [{
        writer: {type: String, required: true},
        content: {type: String, required: true},
        regdate: {type: Date, default: Date.now}
    }],
    hit: {type: Number, default: 0},
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    regdate: {type: Date, default: Date.now}
});

// 모델 등록
var Board = config.model('Board', BoardSchema);

module.exports = Board;