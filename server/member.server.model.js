// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
// var config = require('./server.config'),
//     mongoose = require('mongoose'),
//     crypto = require('crypto');
//     Schema = mongoose.Schema;

// 스키마 정의
// var MemberSchema = new Schema({
//     mid: {type: String, unique: true, required: 'ID is required', trim: true},
//     mpw: {type: String, validate: [
//             function(mpw) {
//                 return mpw && mpw.length > 6;
//             }, 'Password should be longer'
//         ]
//     },
//     salt: {type: String},
//     provider: {type: String, required: 'Provider is required'},
//     providerId: String,
//     providerData: {},
//     mname: String,
//     email: {type: String, match: [/.+\@.+\..+/, "Please fill a valid E-mail address"]},
//     created: {type: Date, default: Date.now}
// });

// 모델 등록
// var Member = config.model('Member', MemberSchema);

// module.exports = Member;