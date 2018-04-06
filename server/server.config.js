// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var mongoose = require('mongoose');

// mongoDB 커넥션 풀 설정
var CreateConnection = function CreateConnection() {
    var connection = mongoose.createConnection('mongodb://localhost:27017/local');
    // var connection = mongoose.createConnection('mongodb://localhost:27017/local/book?poolSize=50');

    return connection;
};

CreateConnection.instance = null;

CreateConnection.getConnection = function() {
    if(this.instance == null) {
        this.instance = new CreateConnection();
    }

    return this.instance;
};

module.exports = CreateConnection.getConnection();