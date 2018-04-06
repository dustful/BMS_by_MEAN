// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var config = require('./server.config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 스키마 정의
var OrderSchema = new Schema({
    product: [String],
    oqty: {type: Number},
    ordername: {type: String},
    ordercontact: {type: String},
    receivername: {type: String},
    receivercontact: {type: String},
    receiveraddr: {type: String},
    status: {type: Number, default: 0},
    regdate: {type: Date, default: Date.now}
});

// 모델 등록
var Order = config.model('Order', OrderSchema);

module.exports = Order;