'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:startApplic
 * @description
 * # startApplic
 * Controller of the prometeoApp
 */
myApplic.controller("startApplicCtrl", ['applicationService','$scope','$modal','dialogs','$location', '$translate', '$cookieStore', '$routeParams',
            function(applicationService,$scope,$modal,dialogs,$location,$translate,$cookieStore,$routeParams) {

    var startApplicCtrl = this;

    $scope.newObject = {};

    startApplicCtrl.userToken = $scope.connectedUser.userToken;

    if(startApplicCtrl.userToken == null){
        $location.path("/");
    }
    startApplicCtrl.applicType = '';
    startApplicCtrl.language = $cookieStore.get('NG_TRANSLATE_LANG_KEY');

    startApplicCtrl.selectInvestType = function(applicType){
       if (applicType == 'I') {
            $translate('startApplicConfirmTitle1').then(function (title) {
                $translate('startApplicconfirmText1').then(function (msg) {
                    dialogs.confirm(title, msg).result.then(function(btn){
                        $location.path("acceptance-application-conditions/" + applicType);
                    },function(btn){
                    });
                });
            });
        } else {
            $translate('startApplicConfirmTitle1').then(function (title) {
                $translate('startApplicconfirmText2').then(function (msg) {
                    dialogs.confirm(title, msg).result.then(function(btn){
                        $location.path("acceptance-application-conditions/" + applicType);
                    },function(btn){
                    });
                });
            });
        }
    }

    startApplicCtrl.initCtrl = function(){
        angular.element('#div-loading').show();
        applicationService.getGeneralInfo(startApplicCtrl.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                if(result.status == undefined){
                    $location.path("/dashboard");
                } else {
                    if(result.status == "NONE"){
                        startApplicCtrl.applicType = $routeParams.applicType;
                        angular.element('#div-loading').show();
                        applicationService.getValidationProfile(startApplicCtrl.applicType, startApplicCtrl.userToken)
                            .then(function(result){
                                angular.element('#div-loading').hide();
                                startApplicCtrl.validations = result;
                            }).catch(function(data){
                                angular.element('#div-loading').hide();
                                if(data.status == "OFF"){
                                    $translate('msgSessionExpired').then(function (msg) {
                                        dialogs.error('Error', msg);
                                    });
                                    $scope.$parent.logout(true);
                                } else {
                                    dialogs.error('Error', data.status);
                                }
                            });
                    }
                }
            }).catch(function(data){
                angular.element('#div-loading').hide();
                if(data.status == "OFF"){
                    $translate('msgSessionExpired').then(function (msg) {
                        dialogs.error('Error', msg);
                    });
                    $scope.$parent.logout(true);
                } else {
                    dialogs.error('Error', data.status);
                }
            });
    }


    startApplicCtrl.startApplic = function(){

    }

    $scope.acceptanceApplicationCond = function(){
        $location.path('acceptance-application-conditions');
    }

    startApplicCtrl.validateProfile = function(){
        var data = [];
        for(var validation in $scope.newObject){
            data.push({
                "idCondicion" : validation,
                "estado" : $scope.newObject[validation]
            })
        }

       var dataRequest = {
            "abreviaturaTipoPostulacion" : startApplicCtrl.applicType,
            "evualuarCondicionItemsRequest" : data
        };
        angular.element('#div-loading').show();
        applicationService.validationProfile(dataRequest, startApplicCtrl.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                if(result.status == "OK"){
                    $location.path('section1-general-information');
                } else {
                    dialogs.error('Error', result.status);
                }
            }).catch(function(data){
                angular.element('#div-loading').hide();
                if(data.status == "OFF"){
                    $translate('msgSessionExpired').then(function (msg) {
                        dialogs.error('Error', msg);
                    });
                    $scope.$parent.logout(true);
                } else {
                    dialogs.error('Error', data.status);
                }
            });
    }

}]);