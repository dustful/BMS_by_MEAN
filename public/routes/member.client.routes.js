(function() {
    // 엄격 모드 적용
    'use strict';

    angular.module('member')
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/member/signin', {
                    templateUrl: 'views/member/member.signin.html',
                    controller: 'memberSigninCtrl'
                })
                .when('/member/list', {
                    templateUrl: 'views/member/member.list.html',
                    controller: 'memberListCtrl'
                })
                .when('/member/signup', {
                    templateUrl: 'views/member/member.signup.html',
                    controller: 'memberSignupCtrl'
                })
                .when('/member/detail/:member_id', {
                    templateUrl: 'views/member/member.detail.html',
                    controller: 'memberDetailCtrl'
                })
                .when('/member/modify/:member_id', {
                    templateUrl: 'views/member/member.modify.html',
                    controller: 'memberModifyCtrl'
                })
                .otherwise({
                    redirectTo: '/member/list'
                });

            $locationProvider.html5Mode(true);
        })
        .controller('memberSigninCtrl', ['$scope', 'memberService', MemberSigninCtrl])
        .controller('memberListCtrl', ['$scope', 'memberService', MemberListCtrl])
        .controller('memberSignupCtrl', ['$scope', '$location', 'memberService', MemberSignupCtrl])
        .controller('memberDetailCtrl', ['$scope', 'memberService', '$routeParams', '$location', MemberDetailCtrl])
        .controller('memberModifyCtrl', ['$scope', 'memberService', '$routeParams', '$location', MemberModifyCtrl]);

        function MemberSigninCtrl($scope, memberService) {
            $scope.signin = function() {
                memberService.getMember($scope.memberData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }
        
        function MemberListCtrl($scope, memberService) {
            $scope.selection = false;
            $scope.message = '';

            memberService.getMembers().then(function(data) {
                if(data.result.length < 1) {
                    $scope.message = '작성된 게시물이 하나도 없습니다.';
                } else {
                    $scope.memberData = data.result;
                    $scope.selection = true;
                }
            }, function(error) {
                console.log('HTTP communication error!')
            });
        }

        function MemberSignupCtrl($scope, $location, memberService) {
            $scope.saveMember = function() {
                memberService.postMember($scope.memberData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/member/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }

        function MemberDetailCtrl($scope, memberService, $routeParams, $location) {
            memberService.getMember($routeParams.member_id).then(function(data) {
                $scope.memberData = data;

                $scope.selection = false;
                $scope.message = '';

                if(data.reply.length < 1) {
                    $scope.message = '작성된 댓글이 하나도 없습니다.';
                } else {
                    $scope.selection = true;
                }
            });

            $scope.deleteMember = function() {
                memberService.deleteMember($routeParams.member_id).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/member/list');
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            };

            // 점검중
            $scope.writeReply = function() {
                memberService.putMember($scope.memberData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/member/detail/' + $routeParams.member_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }

        function MemberModifyCtrl($scope, memberService, $routeParams, $location) {
            memberService.getMember($routeParams.member_id).then(function(data) {
                $scope.memberData = data;
            }, function(error) {
                console.log('HTTP communication error!');
            });

            $scope.updateMember = function() {
                memberService.putMember($scope.memberData).then(function(data) {
                    if(data.result == 'success') {
                        $location.path('/member/detail/' + $routeParams.member_id);
                    }
                }, function(error) {
                    console.log('HTTP communication error!');
                });
            }
        }
})();