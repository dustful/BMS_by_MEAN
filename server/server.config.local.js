// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Member = require('mongoose').model('Member');


// module.exports = function() {
//     passport.use(new LocalStrategy(function(uid, upw, done) {
//         Member.findOne({
//             uid: uid
//         }, function(err, user) {
//             if(err) {
//                 return done(err);
//             }

//             if(!user) {
//                 return done(null, false, {
//                     message: 'Unknown user'
//                 });
//             }

//             if(!user.authenticate(upw)) {
//                 return done(null, false, {
//                     message: 'Invalid password'
//                 });
//             }

//             return done(null, user);
//         });
//     }));
// };