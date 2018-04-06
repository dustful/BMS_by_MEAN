/* 
========== 프로젝트 개요 ==========
명칭 : BMS MEAN(Book Management System for Online Bookstore using MEAN stack)
내용 : MEAN stack 기반 온라인 회원제 서점용 도서 관리 시스템
개발자 : 황성환(dustful@naver.com)


========== 작업 내역 ==========
2017-12-22

2017-12-21
- 구매자 > 주문 : 주문, 주문 취소, 환불 요청
- 판매자 > 주문 관리 : 결제 확인, 발송 처리, 환불 승인

2017-12-15
- 판매자 > 재고 관리 : 재고 목록/상세, 상품 등록/수정/삭제
- 공통 > 고객 게시판 : 게시물 목록/상세, 게시물 등록/수정/삭제

2017-12-14
- 서비스 구상 : 모델 및 뷰 구성


========== 향후 개선 방향 ==========
- 판매자 > 재고 관리 : 일괄 삭제, 상품 이미지 처리
- 구매자 > 장바구니 : 장바구니에 추가, 장바구니에서 제거, 장바구니 주문
- 공통 > 고객 게시판 : 일괄 삭제, 게시물별 댓글 등록/수정/삭제
- 폼 컨트롤별 유효성 검사
- 페이지네이션
- 상품/주문 검색
- 회원 관리(인증 처리, 회원 가입)
- 주문시 재고 수량 조정
*/

// 엄격 모드 적용
'use strict';

// 사용 모듈 호출
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    multer = require('multer'),
    // session = require('session'),
    // flash = require('connect-flash'),
    // passport = require('./server/server.config.passport'),
    // passportLocal = require('passport-local'),
    path = require('path');

// express 객체 할당
var app = express();

// passport 객체 할당
// var passport = passport();

// 본문 파싱 미들웨어 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// favicon 서비스 제공 미들웨어 등록
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// HTTP 요청 로거 미들웨어 등록
// 개발 용도로 응답 상태에 따라 간결한 출력이 표시됨
app.use(morgan('dev'));

// 메서드 오버라이드 미들웨어 등록
// 클라이언트가 지원하지 않는 곳에서 HTTP 동사를 사용할 수 있음
app.use(methodOverride());

// 세션 미들웨어 등록
// app.use(session({
//     saveUninitialized: true,
//     resave: true,
//     secret: config.sessionSecret
// }));

// 뷰 템플릿 엔진 설정
// app.set('views', './app/views');
// app.set('view engine', 'ejs');

// flash 미들웨어 등록
// app.use(flash());

// 패스포트 미들웨어 등록
// app.use(passport.initialize());
// app.use(passport.session());

// 쿠키 구문 분석 미들웨어 등록
app.use(cookieParser());

// 정적 파일 제공 미들웨어 등록
app.use(express.static(path.join(__dirname + '/public')));

// 오류 처리 미들웨어 등록
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error');
});

// 라우팅 모듈 호출
require('./server/server.routes')(app);

// 포트 설정
var port = process.env.PORT || 3000;

// 서버 연결 청취
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});