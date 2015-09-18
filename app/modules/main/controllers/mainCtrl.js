'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the main
 */
myMain.controller("mainCtrl", ['mainService','applicationService','$scope', '$cookieStore', '$location','$log', '$route', '$translate', '$rootScope','dialogs',
            function (mainService, applicationService, $scope, $cookieStore, $location, $log, $route, $translate, $rootScope,dialogs) {

    var mainCtrl = this;

    $scope.$route = $route;

    $translate('processApplicInstrucSec1Title').then(function (title) {
        $scope.titleInstructions = title;
    });
    $translate('NOTICE').then(function (text) {
        $scope.titleNotice = text;
    });

    $scope.mainMenu = [];


    $scope.applicGralInfoParent = {};

    if ($cookieStore.get('user') != undefined) {

        $scope.connectedUser = { userActive : $cookieStore.get('user').userActive,
                                userLogin : $cookieStore.get('user').userLogin,
                                userToken : $cookieStore.get('user').userToken,
                                userUsername : $cookieStore.get('user').userUsername,
                                userRole : $cookieStore.get('user').userRole,
                                userFirstName : $cookieStore.get('user').userFirstName,
                                userLastName : $cookieStore.get('user').userLastName,
                                userLanguage : $cookieStore.get('user').userLanguage,
                                isConnected : $cookieStore.get('user').isConnected,
                                urlStart : $cookieStore.get('user').urlStart};

        $scope.mainMenu = [];
        $scope.mainMenu = $cookieStore.get('mainMenu');


    } else {
        $scope.mainMenu = [
            {href : '#/', clic : '', title : 'menuStart', activetab : 'start'},
            {href : '#/user-register', clic : '', title : 'menuRegister', activetab : 'register'},
            {href : '#/bases-application', clic : '', title : 'menuBases', activetab : 'bases-application'},
            {href : '#/magazines', clic : '', title : 'menuMagazines', activetab : 'magazines'},
            {href : '#/institution-register', clic : '', title : 'menuInstitution', activetab : 'institution'},
            {href : '#/faq', clic : '', title : 'menuFAQ', activetab : 'faq'},
            {href : '#/contact', clic : '', title : 'menuContact', activetab : 'contact'}
        ];

        $cookieStore.put('mainMenu', $scope.mainMenu);
        $scope.connectedUser = {
            userActive : '',
            userLogin : '',
            userToken : '',
            userUsername : '',
            userRole : '',
            userFirstName : '',
            userLastName : '',
            userLanguage : '',
            isConnected : false,
            urlStart : ''};

    }

    $scope.language = $cookieStore.get('NG_TRANSLATE_LANG_KEY');

    $scope.initCtrl = function(){
        if ($scope.connectedUser.userActive == '') {
            $scope.logout(true);
        }
        if ($cookieStore.get('user') != undefined) {
            $scope.connectedUser = {
                userActive: $cookieStore.get('user').userActive,
                userLogin: $cookieStore.get('user').userLogin,
                userToken: $cookieStore.get('user').userToken,
                userUsername: $cookieStore.get('user').userUsername,
                userRole: $cookieStore.get('user').userRole,
                userFirstName: $cookieStore.get('user').userFirstName,
                userLastName: $cookieStore.get('user').userLastName,
                userLanguage: $cookieStore.get('user').userLanguage,
                isConnected: $cookieStore.get('user').isConnected,
                urlStart: $cookieStore.get('user').urlStart
            };
            $scope.mainMenu = [];
            $scope.mainMenu = $cookieStore.get('mainMenu');

        }
    }

    $scope.progressBar = function (progress){
        var classProgress = '';
        if(progress < 75){
            classProgress = 'progress-bar-danger';
        } else {
            if (progress >= 75 && progress < 100){
                classProgress = 'progress-bar-warning';
            } else {
                classProgress = 'progress-bar-success';
            }
        }
        return classProgress;
    }

    $scope.logout = function(sessionExpired){
        $scope.mainMenu = [
            {href : '#/', clic : '', title : 'menuStart'},
            {href : '#/user-register', clic : '', title : 'menuRegister'},
            {href : '#/bases-application', clic : '', title : 'menuBases'},
            {href : '#/magazines', clic : '', title : 'menuMagazines'},
            {href : '#/institution-register', clic : '', title : 'menuInstitution'},
            {href : '#/faq', clic : '', title : 'menuFAQ'},
            {href : '#/contact', clic : '', title : 'menuContact'}
        ];
        if(sessionExpired){
            $scope.connectedUser = {
                userActive : '',
                userLogin : '',
                userToken : '',
                userUsername : '',
                userRole : '',
                userFirstName : '',
                userLastName : '',
                userLanguage : '',
                isConnected : false,
                urlStart : ''};
            $cookieStore.remove('login');
            $cookieStore.remove('user');
            $cookieStore.remove('instanceApplic');
            $location.path('/');
        } else {
            angular.element('#div-loading').show();
            mainService.userLogout($cookieStore.get('user').userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status = "OK"){
                        $scope.connectedUser = {
                            userActive : '',
                            userLogin : '',
                            userToken : '',
                            userUsername : '',
                            userRole : '',
                            userFirstName : '',
                            userLastName : '',
                            userLanguage : '',
                            isConnected : false,
                            urlStart : ''};
                        $cookieStore.remove('login');
                        $cookieStore.remove('user');
                        $cookieStore.remove('instanceApplic');
                        $location.path('/');
                    }
                }).catch(function(data){
                    angular.element('#div-loading').hide();
                    if(data.status === "OFF"){
                        $scope.connectedUser = {
                            userActive : '',
                            userLogin : '',
                            userToken : '',
                            userUsername : '',
                            userRole : '',
                            userFirstName : '',
                            userLastName : '',
                            userLanguage : '',
                            isConnected : false,
                            urlStart : ''};
                        $cookieStore.remove('login');
                        $cookieStore.remove('user');
                        $cookieStore.remove('instanceApplic');
                        $location.path('/');
                    } else {
                        dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                    }
                });
        }

    }

    $scope.changeLanguage = function(){
        if($scope.language == 'es_ES') {
            $scope.language = 'en_US';
            $cookieStore.put('language', $scope.language);
        } else {
            $scope.language = 'es_ES';
            $cookieStore.put('language', $scope.language);
        }
        $translate.use($scope.language);
        $scope.$parent.$broadcast('languageClic', { language : $scope.language});
    }

    $scope.continue = function(path){
        $location.path(path);
    }

    $scope.registerApplic = function(applicId){
                angular.element('#div-loading').show();
                applicationService.registerApplic(applicId, $scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status == "OK"){
                            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                                .then(function(result){
                                    angular.element('#div-loading').hide();
                                    $cookieStore.put('instanceApplic', result.instancia);
                                    $location.path('/dashboard');
                                    $translate('processApplicDialogMsg').then(function (msg) {
                                        dialogs.notify($scope.titleNotice, msg);
                                    });
                                }).catch(function(data){
                                    angular.element('#div-loading').hide();
                                    if(data.status == "OFF"){
                                        $translate('msgSessionExpired').then(function (msg) {
                                            dialogs.error('Error', msg);
                                        });
                                        $scope.$parent.logout(true);
                                    } else {
                                        if(data.status == null){
                                            dialogs.error('Error', "null");
                                        } else {
                                            dialogs.error('Error', data.status);
                                        }
                                    }
                                });
                        }
                    }).catch(function(data){
                        angular.element('#div-loading').hide();
                        if(data.status != "OFF"){
                            dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                        }
                    });
    }

    $scope.registerApplic1 = function(){
        $location.path('/recommend-candidate');
    }

  }]);
