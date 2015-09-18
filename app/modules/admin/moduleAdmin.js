'use strict';

var myAdmin = angular.module('admin',['ngRoute']);

myAdmin.config(function ($routeProvider) {
    $routeProvider
        .when('/user-register', {
            templateUrl: 'modules/admin/views/user-register.html',
            controller: 'userRegisterCtrl',
            activetab: 'register'
        })
        .when('/recover-password', {
            templateUrl: 'modules/admin/views/recover-password.html',
            controller: 'userRegisterCtrl',
            activetab: 'start'
        })
        .when('/institution-register', {
            templateUrl: 'modules/admin/views/institution-register.html',
            controller: 'institutionRegisterCtrl',
            activetab: 'institution'
        })
        .when('/dashboard', {
            templateUrl: 'modules/admin/views/dashboard.html',
            controller: 'dashboardCtrl',
            activetab: 'start'
        })
        .when('/user-profile', {
            templateUrl: 'modules/admin/views/user-profile.html',
            controller: 'userRegisterCtrl',
            activetab: 'user-profile'
        })
        .when('/user-confirm/:username/:token', {
            templateUrl: 'modules/admin/views/user-confirm.html',
            controller: 'userLoginCtrl',
            activetab: 'start'
        })
        .otherwise({reditrectTo: "/"});
});


myAdmin.constant('PROPERTIES_ADMIN', {
    "regularExpression" : {
        "userName" : /^[a-z0-9_-]{6,15}$/
    },
    "services" : {
        "uriWebServiceUserExists" : "PROMETEOWEB/ws/verificarusernameemail",
        "uriWebServiceUserRegister" : "PROMETEOWEB/ws/registrarusuario",
        "uriWebUserProfile" : "PROMETEOWEB/ws/pl",
        "uriWebServiceUserLogin" : "PROMETEOWEB/ws/login",
        "uriWebServiceUserConfirm" : "PROMETEOWEB/ws/confirmacion",
        "uriWebServiceUserActived" : "PROMETEOWEB/ws/usuarioestado",
        "uriWebServiceInfoChannel" : "PROMETEOWEB/ws/canalinformacion",
        "uriWebGetCountrys" : "PROMETEOWEB/ws/pl/pais",
        "uriWebGetNotifications" : "PROMETEOWEB/ws/pl/ntfc",
        "uriWebSetReadNotification" : "PROMETEOWEB/ws/pl/ntfc/leido",
        "uriWebProccess" : "PROMETEOWEB/ws/pl/proceso",
        "uriWebGetApplications" : "PROMETEOWEB/ws/cl/calificacion/porcalificar"
    }
});



