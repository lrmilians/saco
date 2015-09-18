'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controllers:
 *                              processApplicSection5Ctrl
 *                                  affiliationDialogCtrl,
 *                                  scholarshipDialogCtrl,
 *
 * @description
 * processApplicSection5Ctrl
 * # affiliationDialogCtrl,
 * # scholarshipDialogCtrl,
 * Controllers of the prometeoApp
 */

myApplic.controller("processApplicSection5Ctrl", ['PROPERTIES_APPLIC','catalogsService','applicationService','applicSection5Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(PROPERTIES_APPLIC,catalogsService,applicationService,applicSection5Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        var processApplicSection5Ctrl = this;

        processApplicSection5Ctrl.typesRecognition = PROPERTIES_APPLIC.typesRecognition;

        processApplicSection5Ctrl.previousContact = false;

        $scope.patternAcronym = PROPERTIES_APPLIC.regularExpression.acronym;
        $scope.patternContactName = PROPERTIES_APPLIC.regularExpression.name;


        processApplicSection5Ctrl.initCtrl = function(){
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function(result){
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicSection5Ctrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicSection5Ctrl.classProgress = $scope.$parent.progressBar(processApplicSection5Ctrl.applicGralInfo.avance);
                    processApplicSection5Ctrl.btnTitle = 'startApplicBtnSave';
                    applicSection5Service.getAffiliations(processApplicSection5Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection5Ctrl.affiliations = result;
                            } else {
                                processApplicSection5Ctrl.affiliations = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection5Service.getScholarships(processApplicSection5Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection5Ctrl.scholarships = result;
                                for(var i in processApplicSection5Ctrl.scholarships){
                                    for(var j in processApplicSection5Ctrl.typesRecognition){
                                        if(processApplicSection5Ctrl.scholarships[i].tipo == processApplicSection5Ctrl.typesRecognition[j].id){
                                            processApplicSection5Ctrl.scholarships[i].typeRecog = processApplicSection5Ctrl.typesRecognition[j].description;
                                        }
                                    }
                                }
                            } else {
                                processApplicSection5Ctrl.scholarships = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection5Service.getInstitutions($scope.connectedUser.userToken)
                        .then(function(result){
                            processApplicSection5Ctrl.institutions = result;
                            processApplicSection5Ctrl.institutionSelected = processApplicSection5Ctrl.institutions[0];
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection5Service.getPreviousContact(processApplicSection5Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status != "NONE"){
                                processApplicSection5Ctrl.btnTitle = 'startApplicBtnUpdate';
                                processApplicSection5Ctrl.previousContact = true;
                                for(var i in processApplicSection5Ctrl.institutions){
                                    if(processApplicSection5Ctrl.institutions[i].id == result.idInstitucion){
                                        processApplicSection5Ctrl.institutionSelected = processApplicSection5Ctrl.institutions[i];
                                    }
                                }
                                processApplicSection5Ctrl.acronym = result.siglas;
                                processApplicSection5Ctrl.contactName = result.nombre;
                                processApplicSection5Ctrl.contactEmail = result.email;
                            }
                        }).catch(function(data){
                            angular.element('#div-loading').hide();
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
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


        processApplicSection5Ctrl.addAffiliation = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-affiliation.html','affiliationDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection5Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                affiliation : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection5Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection5Ctrl.editAffiliation = function(affiliation){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-affiliation.html','affiliationDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection5Ctrl.applicGralInfo.idPostulacion,
                action : affiliation.id,
                affiliation : affiliation
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection5Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection5Ctrl.deleteAffiliation = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection5Service.deleteAffiliation(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection5Ctrl.initCtrl();
                                $translate('processApplicDialogMsg3').then(function (msg) {
                                    dialogs.notify(undefined, msg);
                                });
                            }
                        }).catch(function(data){
                            angular.element('#div-loading').hide();
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                },function(btn){

                });
            });
        }

        processApplicSection5Ctrl.instructionsSec5 = function(){
            $translate('processApplicInstrucSec5Msg1').then(function (msg) {
                dialogs.notify($scope.titleInstructions, msg);
            });
        }


        processApplicSection5Ctrl.addScholarship = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-scholarship.html','scholarshipDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection5Ctrl.applicGralInfo.idPostulacion,
                typesRecognition : processApplicSection5Ctrl.typesRecognition,
                action : -1,
                scholarship : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection5Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection5Ctrl.editScholarship = function(scholarship){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-scholarship.html','scholarshipDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection5Ctrl.applicGralInfo.idPostulacion,
                typesRecognition :processApplicSection5Ctrl.typesRecognition,
                action : scholarship.id,
                scholarship : scholarship
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection5Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection5Ctrl.deleteScholarship = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection5Service.deleteScholarship(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection5Ctrl.initCtrl();
                                $translate('processApplicDialogMsg3').then(function (msg) {
                                    dialogs.notify(undefined, msg);
                                });
                            }
                        }).catch(function(data){
                            angular.element('#div-loading').hide();
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                },function(btn){

                });
            });
        }

        processApplicSection5Ctrl.setPreviousContact = function(){
            if ($scope.previousContactForm.$valid){
                var dataRequest = {
                    idPostulacion : processApplicSection5Ctrl.applicGralInfo.idPostulacion,
                    idInstitucion : processApplicSection5Ctrl.institutionSelected.id,
                    siglas : processApplicSection5Ctrl.acronym,
                    nombre : processApplicSection5Ctrl.contactName,
                    email : processApplicSection5Ctrl.contactEmail
                }
                angular.element('#div-loading').show();
                applicSection5Service.setPreviousContact(dataRequest, $scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status == "OK"){
                            processApplicSection5Ctrl.initCtrl();
                            $translate('processApplicDialogMsg1').then(function (msg) {
                                dialogs.notify($scope.titleNotice, msg);
                            });
                        }
                    }).catch(function(data){
                        angular.element('#div-loading').hide();
                        if(data.status != "OFF"){
                            dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                        }
                    });
            }
        }

}]);

myApplic.controller("affiliationDialogCtrl",function(PROPERTIES_APPLIC,applicSection5Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.affiliation).length !== 0){
        $scope.affiliation = {
            entity : data.affiliation.institucion,
            description : data.affiliation.descripcion,
        };
        $scope.dataEmpty = false;
    } else {
        $scope.univTeaching = {
            entity : '',
            description : '',
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.affiliationForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                institucion : $scope.affiliation.entity,
                descripcion : $scope.affiliation.description
            }
            angular.element('#div-loading').show();
            applicSection5Service.setAffiliation(dataRequest, data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleNotice, msg);
                        });
                        $modalInstance.close(result);
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
                        dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                    }
                });
        }
    };
})

myApplic.controller("scholarshipDialogCtrl",function(PROPERTIES_APPLIC,applicSection5Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.scholarship).length !== 0){
        $scope.scholarship = {
            typesRecognition :data.typesRecognition,
            description : data.scholarship.descripcion,
            year : data.scholarship.anio,
            nameFile : data.scholarship.nombreFile,
            urlFile : data.scholarship.urlFile,
        };
        for(var i in $scope.scholarship.typesRecognition){
           if($scope.scholarship.typesRecognition[i].id == data.scholarship.tipo){
               $scope.scholarship.typeRecognitionSelected = $scope.scholarship.typesRecognition[i];
           }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.scholarship = {
            typesRecognition :data.typesRecognition,
            description : '',
            year : '',
            nameFile : '',
            urlFile : '',
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.scholarshipForm.$valid){
            var fileName;
            var file;
            if ($scope.file.name == undefined) {
                fileName = null;
                file = null;
            } else {
                fileName = $scope.file.name;
                file = $scope.file;
            }
            var dataRequest = {
                idPostulacion : data.applicId,
                tipo : $scope.scholarship.typeRecognitionSelected.id,
                descripcion : $scope.scholarship.description,
                anio : parseInt($scope.scholarship.year),
                nombreFile : fileName
            }
            angular.element('#div-loading').show();
            applicSection5Service.setScholarship(dataRequest, file, data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleNotice, msg);
                        });
                        $modalInstance.close(result);
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
                        dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                    }
                });
        }
    };

})
