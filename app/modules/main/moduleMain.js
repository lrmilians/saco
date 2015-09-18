'use strict';

var myMain = angular.module('main',['ui.bootstrap.accordion']);

myMain.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'modules/admin/views/user-login.html',
            controller: 'userLoginCtrl',
            activetab: 'start'
        })
        .when('/about', {
            templateUrl: 'modules/main/views/about.html',
            controller: 'aboutCtrl',
            activetab: 'about'
        })
        .when('/bases-application', {
            templateUrl: 'modules/main/views/bases-application.html',
            controller: 'basesApplicationCtrl',
            activetab: 'bases-application'
        })
        .when('/magazines', {
            templateUrl: 'modules/main/views/magazines.html',
            controller: 'magazinesCtrl',
            activetab: 'magazines'
        })
        .when('/faq', {
            templateUrl: 'modules/main/views/faq.html',
            controller: 'faqCtrl',
            activetab: 'faq'
        })
        .when('/contact', {
            templateUrl: 'modules/main/views/contact.html',
            controller: 'contactCtrl',
            activetab: 'contact'
        })
        .when('/adminmodule', {
            templateUrl: 'modules/main/views/contact.html',
            controller: 'contactCtrl',
            activetab: 'adminmodule'
        })
        .otherwise({reditrectTo: "/"});
});

myMain.constant('PROPERTIES_MAIN', {
    "services" : {
        "uriWebServiceUserLogout" : "PROMETEOWEB/ws/pl/logout"
    }
});
