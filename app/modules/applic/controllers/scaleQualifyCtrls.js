'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:scaleCtrl,
 *                              qualifyCtrl,
 *                              validationCtrl,
 *                              qualifyDialogCtrl,
 *                              qualifyHistoryDialogCtrl
 * @description
 * # scaleCtrl
 * # qualifyCtrl
 * # validationCtrl
 * # qualifyDialogCtrl
 * # qualifyHistoryDialogCtrl
 * Controller of the prometeoApp
 */
myApplic.controller("scaleCtrl", ['scaleService','qualifyService','$scope','dialogs','$location','$translate','RouteArgs',
            function(scaleService,qualifyService,$scope,dialogs,$location,$translate,RouteArgs) {

    var scaleCtrl = this;

    scaleCtrl.initCtrl = function(){
        angular.element('#div-loading').show();
        if(RouteArgs.data.application === undefined){
            $location.path('/dashboard');
        } else {
            scaleCtrl.applicData = RouteArgs.data.application;
            scaleService.getScales(scaleCtrl.applicData.tipoPostulacion, $scope.connectedUser.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status != "EMPTY"){
                        scaleCtrl.scales = result;
                    } else {
                        scaleCtrl.scales = [];
                    }
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

    }

    scaleCtrl.applicQualify = function(scale){
        angular.element('#div-loading').show();
        RouteArgs.data.scale = {};
        RouteArgs.data.qualify = {};
        RouteArgs.data.scale = scale;
        var dataRequest = {
            idPostulacion : scaleCtrl.applicData.idPostulacion,
            codigoBaremo : parseInt(scale.codigoBaremo),
            pid : scaleCtrl.applicData.pid
        }
        qualifyService.startQualify(dataRequest,$scope.connectedUser.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                RouteArgs.data.qualifyId = result;
                $location.url("/application-qualify");
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
        // $location.url("/application-qualify");

    }

}]);

myApplic.controller("qualifyCtrl", ['scaleService','qualifyService','$scope','PROPIEDADES','$modal','dialogs','$location','$translate','RouteArgs',
    function(scaleService,qualifyService,$scope,PROPIEDADES,$modal,dialogs,$location,$translate,RouteArgs) {

        var qualifyCtrl = this;

        qualifyCtrl.initCtrl = function(){
            if(RouteArgs.data.application === undefined || RouteArgs.data.scale === undefined){
                $location.path('/dashboard');
            } else {
                qualifyCtrl.applicData = RouteArgs.data.application;
                qualifyCtrl.scaleData = RouteArgs.data.scale;
                qualifyCtrl.qualifyId = RouteArgs.data.qualifyId;

                scaleService.getScaleById(qualifyCtrl.scaleData.codigoBaremo,$scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        qualifyCtrl.scaleDetails = result;
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

            //angular.element('#div-loading').show();
            /*catalogsService.getCountrys($scope.connectedUser.userToken)
             .then(function(resultCountrys){
             applicDetailCtrl.countrys = resultCountrys;
             }).catch(function(data){

             });*/
        }

        qualifyCtrl.viewQualifyHistory = function(applicId){
            angular.element('#div-loading').show();
            qualifyService.getQualifyHistory($scope.connectedUser.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status != "EMPTY"){
                        qualifyCtrl.qualifyHistory = result;
                    } else {
                        qualifyCtrl.qualifyHistory = [];
                    }
                    var dlg = dialogs.create('modules/applic/views/dialog-view/view-qualify-history.html','qualifyHistoryDialogCtrl',{
                        applicId : applicId,
                        userToken : $scope.connectedUser.userToken,
                        qualifyHistory : qualifyCtrl.qualifyHistory
                    },'lg');
                    dlg.result.then(function(result){

                    },function(){
                        if(angular.equals($scope.name,''))
                            $scope.name = 'You did not enter in your name!';
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

        qualifyCtrl.qualify = function(scaleItem){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-qualify.html','qualifyDialogCtrl',{
                applicData : qualifyCtrl.applicData,
                scaleData : qualifyCtrl.scaleData,
                qualifyId : qualifyCtrl.qualifyId,
                userToken : $scope.connectedUser.userToken,
                scaleItem : scaleItem
            },'lg');
            dlg.result.then(function(result){
                qualifyCtrl.initCtrl();
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        qualifyCtrl.qualifyEnd = function(){
            if(qualifyCtrl.scaleCorrect && !qualifyCtrl.scaleComplete){
                $location.path('describe-validation');
            }
        }

    }]);

myApplic.controller("validationCtrl", ['validationService','$scope','dialogs','$location','$translate','RouteArgs',
    function(scaleService,$scope,dialogs,$location,$translate,RouteArgs) {

        var validationCtrl = this;

        validationCtrl.initCtrl = function(){
            //angular.element('#div-loading').show();
            if(RouteArgs.data.application === undefined){
                $location.path('/dashboard');
            } else {
                validationCtrl.applicData = RouteArgs.data.application;
                console.log(validationCtrl.applicData);
                /*scaleService.getScales(scaleCtrl.applicData.tipoPostulacion, $scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status != "EMPTY"){
                            scaleCtrl.scales = result;
                        } else {
                            scaleCtrl.scales = [];
                        }
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
                    });*/
            }

        }


    }]);

myAdmin.controller("qualifyDialogCtrl",function(PROPERTIES_APPLIC,qualifyService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.scaleItem = data.scaleItem;
    $scope.applicData = data.applicData;
    $scope.scaleData = data.scaleData;
    $scope.numberRange = false;

    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;
    $scope.q = {description : ''};
    var values = $scope.scaleItem.valores.split(';');
    if(values.length === 1){
        $scope.q.valueQ = $scope.scaleItem.valores.split('-');
        $scope.numberRange = true;
    } else {
        $scope.q.valuesCombo = [];
        for(var i in values){
            $scope.q.valuesCombo.push(
                {id : i, description : values[i]}
            );
        }
    }

    $scope.submitForm = function(){
       // if ($scope.qualifyForm.$valid){
                var value;
                if($scope.numberRange){
                    value = $scope.q.valueQSelected;
                } else {
                    value = $scope.q.valuesComboSelected.description;
                }
                var dataRequest = {
                    idCalificacion : data.qualifyId,
                    idCriterio : $scope.scaleItem.id,
                    puntuacion : value,
                    idUniversidad : null,
                    codigoBaremo : parseInt($scope.scaleData.codigoBaremo),
                    observaciones : $scope.q.description
                }
            angular.element('#div-loading').show();
            qualifyService.sendQualify(dataRequest, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $modalInstance.dismiss('Canceled');
                    }
                 }).catch(function(data){
                     angular.element('#div-loading').hide();
                     if(data.status == "OFF"){
                        $translate('msgSessionExpired').then(function (msg) {
                            dialogs.error('Error', msg);
                        });
                        $scope.$parent.logout(true);
                     } else {
                        dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                     }
                 });

      //  }
    };

    $scope.getCriteria = function(){
        var value;
        if($scope.numberRange){
            value = $scope.q.valueQSelected;
        } else {
            value = $scope.q.valuesComboSelected.description;
        }
        angular.element('#div-loading').show();
         qualifyService.qualifyCriteria($scope.scaleData.codigoBaremo, $scope.scaleItem.id, value, data.userToken)
             .then(function(result){
                angular.element('#div-loading').hide();
                $scope.rating = result;
             }).catch(function(data){
                angular.element('#div-loading').hide();
                if(data.status == "OFF"){
                    $translate('msgSessionExpired').then(function (msg) {
                    dialogs.error('Error', msg);
                });
                $scope.$parent.logout(true);
                } else {
                    dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                }
         });
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

});

myAdmin.controller("qualifyHistoryDialogCtrl",function($scope,$modalInstance,data){

    $scope.qualifyHistory = data.qualifyHistory;
    
    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

});