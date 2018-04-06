// 엄격 모드 적용
'use strict';

var appConfig = (function() {
    // 주 애플리케이션의 모듈명 설정
    var moduleName = 'mainApp';
    // 주 애플리케이션의 모듈에 주입할 의존성 설정
    var moduleVendorDependencies = ['ngResource', 'ngRoute'];
    // 새 모듈 추가시 설정
    var regModule = function(newModuleName, dependencies) {
        angular.module(newModuleName, dependencies || []);
        angular.module(moduleName).requires.push(newModuleName);
    }

    return {
        moduleName: moduleName,
        moduleVendorDependencies: moduleVendorDependencies,
        regModule: regModule
    }
})();

// 주 모듈 정의 및 의존성 주입
angular.module(appConfig.moduleName, appConfig.moduleVendorDependencies);

// 검색 엔진 최적화를 위한 해시뱅(hashbang) 사용
angular.module(appConfig.moduleName).config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appConfig.moduleName]);
});