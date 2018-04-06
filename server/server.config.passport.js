// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var passport = require('passport'),
    mongoose = require('mongoose');

// module.exports = function() {
//     var Member = mongoose.model('Member');

//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function(id, done) {
//         Member.findOne({
//             _id: id
//         }, '-password -salt', function(err, user) {
//             done(err, user);
//         });
//     });

//     require('./server.config.local')();
// };