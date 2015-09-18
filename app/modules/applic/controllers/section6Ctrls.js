'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controllers:
 *                              processApplicSection6Ctrl,
 *                              processApplicRecomCandidateCtrl
 *
 * @description
 * # processApplicSection6Ctrl,
 * # processApplicRecomCandidateCtrl
 * Controllers of the prometeoApp
 */

myApplic.controller("processApplicSection6Ctrl", ['PROPERTIES_APPLIC','catalogsService','applicationService','applicSection6Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(PROPERTIES_APPLIC,catalogsService,applicationService,applicSection6Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        $scope.file = {};

        var processApplicSection6Ctrl = this;

        processApplicSection6Ctrl.dataEmpty = true;

        processApplicSection6Ctrl.initCtrl = function () {
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function (result) {
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicSection6Ctrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicSection6Ctrl.classProgress = $scope.$parent.progressBar(processApplicSection6Ctrl.applicGralInfo.avance);
                    processApplicSection6Ctrl.btnTitle = 'startApplicBtnSave';
                    applicSection6Service.getCurriculumVitae(processApplicSection6Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function (result) {
                            if (result.status != "NONE") {
                                processApplicSection6Ctrl.dataEmpty = false;
                                processApplicSection6Ctrl.btnTitle = 'startApplicBtnUpdate';
                                processApplicSection6Ctrl.nameFile = result.nombreFile;
                                processApplicSection6Ctrl.urlFile = result.urlFile;
                            }
                        }).catch(function (data) {
                            if (data.status != "OFF") {
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection6Service.getToComplete(processApplicSection6Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function (result) {
                            angular.element('#div-loading').hide();
                            var catalogToCompletes = PROPERTIES_APPLIC.toCompletes;
                            processApplicSection6Ctrl.toCompletes = [];
                            processApplicSection6Ctrl.toCompleteText = 'processApplicSec7Text2';
                            if (result.length !== 0) {
                                processApplicSection6Ctrl.toCompleteText = 'processApplicSec7Text1';
                                for(var i in catalogToCompletes){
                                    for(var j in result){
                                        if(catalogToCompletes[i].id == result[j]){
                                            processApplicSection6Ctrl.toCompletes.push(catalogToCompletes[i]);
                                        }
                                    }
                                }
                            }
                        }).catch(function (data) {
                            angular.element('#div-loading').hide();
                            if (data.status != "OFF") {
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                }).catch(function (data) {
                    angular.element('#div-loading').hide();
                    if (data.status == "OFF") {
                        $translate('msgSessionExpired').then(function (msg) {
                            dialogs.error('Error', msg);
                        });
                        $scope.$parent.logout(true);
                    } else {
                        if (data.status == null) {
                            dialogs.error('Error', "null");
                        } else {
                            dialogs.error('Error', data.status);
                        }
                    }
                });
        }

        processApplicSection6Ctrl.instructionsSec6 = function () {
            $translate('processApplicInstrucSec6Msg1').then(function (msg) {
                dialogs.notify($scope.titleInstructions, msg);
            });
        }

        processApplicSection6Ctrl.setCurriculumVitae = function () {
            if ($scope.dataEmpty == true || $scope.file.name == undefined) {
                $translate('processApplicDialogMsg2').then(function (msg) {
                    dialogs.error('Error', msg);
                });
            } else {
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
                    nombreFile: fileName
                }

                angular.element('#div-loading').show();
                applicSection6Service.setCurriculumVitae(dataRequest, file, processApplicSection6Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                    .then(function (result) {
                        angular.element('#div-loading').hide();
                        if (result.status == "OK") {
                            processApplicSection6Ctrl.initCtrl();
                            $translate('processApplicDialogMsg1').then(function (msg) {
                                dialogs.notify($scope.titleNotice, msg);
                            });
                        }
                    }).catch(function (data) {
                        angular.element('#div-loading').hide();
                        if (data.status != "OFF") {
                            dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                        }
                    });
            }
        }

}]);

myApplic.controller("processApplicRecomCandidateCtrl", ['PROPERTIES_APPLIC','catalogsService','applicationService','applicSection6Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(PROPERTIES_APPLIC,catalogsService,applicationService,applicSection6Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        var processApplicRecomCandidateCtrl = this;

        processApplicRecomCandidateCtrl.dataEmpty = true;
        processApplicRecomCandidateCtrl.btnTitleSendRecom = 'processApplicReCandBtnMsg1';
        processApplicRecomCandidateCtrl.candidates = [];
        processApplicRecomCandidateCtrl.id = 0;

        $scope.patternFirstName = $scope.patternLastName = PROPERTIES_APPLIC.regularExpression.name;
        $scope.patternTextInv =  PROPERTIES_APPLIC.regularExpression.description;

        processApplicRecomCandidateCtrl.initCtrl = function () {
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function (result) {
                    angular.element('#div-loading').hide();
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicRecomCandidateCtrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicRecomCandidateCtrl.id++;
                    processApplicRecomCandidateCtrl.firstName = '';
                    processApplicRecomCandidateCtrl.lastName = '';
                    processApplicRecomCandidateCtrl.email = '';
                    processApplicRecomCandidateCtrl.btnTitle = 'btnAdd';
                }).catch(function (data) {
                    angular.element('#div-loading').hide();
                    if (data.status == "OFF") {
                        $translate('msgSessionExpired').then(function (msg) {
                            dialogs.error('Error', msg);
                        });
                        $scope.$parent.logout(true);
                    } else {
                        if (data.status == null) {
                            dialogs.error('Error', "null");
                        } else {
                            dialogs.error('Error', data.status);
                        }
                    }
                });
        }

        processApplicRecomCandidateCtrl.setCandidate = function () {
            if ($scope.recomCandidateForm.$valid){
                if(processApplicRecomCandidateCtrl.btnTitle === 'btnAdd'){
                    if(processApplicRecomCandidateCtrl.candidates.length < 30){
                        var existEmail = false;
                        for(var i in processApplicRecomCandidateCtrl.candidates){
                            if(processApplicRecomCandidateCtrl.candidates[i].email === processApplicRecomCandidateCtrl.email){
                                existEmail = true;
                            }
                        }
                        if(!existEmail){
                            processApplicRecomCandidateCtrl.candidates.push(
                                {
                                    id : processApplicRecomCandidateCtrl.id,
                                    firstName : processApplicRecomCandidateCtrl.firstName,
                                    lastName : processApplicRecomCandidateCtrl.lastName,
                                    email : processApplicRecomCandidateCtrl.email,
                                }
                            );
                            processApplicRecomCandidateCtrl.btnTitleSendRecom = 'processApplicReCandBtnMsg2';
                        } else {
                            $translate('processApplicReCandMsg1').then(function (msg) {
                                dialogs.error('Error', msg);
                            });
                        }
                    } else {
                        $translate('processApplicReCandMsg2').then(function (msg) {
                            dialogs.error('Error', msg);
                        });
                    }
                } else {
                    for(var i in processApplicRecomCandidateCtrl.candidates){
                        if(processApplicRecomCandidateCtrl.candidates[i].id == processApplicRecomCandidateCtrl.idEdit){
                            processApplicRecomCandidateCtrl.candidates[i].firstName = processApplicRecomCandidateCtrl.firstName,
                            processApplicRecomCandidateCtrl.candidates[i].lastName = processApplicRecomCandidateCtrl.lastName,
                            processApplicRecomCandidateCtrl.candidates[i].email = processApplicRecomCandidateCtrl.email
                        }
                    }
                }
                processApplicRecomCandidateCtrl.initCtrl();
                processApplicRecomCandidateCtrl.dataEmpty = false;

            }
        }

        processApplicRecomCandidateCtrl.deleteCandidate = function (id) {
            for(var i in processApplicRecomCandidateCtrl.candidates){
                if(processApplicRecomCandidateCtrl.candidates[i].id === id){
                    processApplicRecomCandidateCtrl.candidates.splice(i,1);
                }
            }
            if(processApplicRecomCandidateCtrl.candidates.length == 0){
                processApplicRecomCandidateCtrl.dataEmpty = true;
                processApplicRecomCandidateCtrl.btnTitleSendRecom = 'processApplicReCandBtnMsg1';
            }
        }

        processApplicRecomCandidateCtrl.editCandidate = function (candidate) {
            processApplicRecomCandidateCtrl.idEdit = candidate.id;
            processApplicRecomCandidateCtrl.firstName = candidate.firstName;
            processApplicRecomCandidateCtrl.lastName = candidate.lastName;
            processApplicRecomCandidateCtrl.email = candidate.email;
            processApplicRecomCandidateCtrl.btnTitle = 'btnEdit';
        }

        processApplicRecomCandidateCtrl.sendRecomendation = function(){
            if(processApplicRecomCandidateCtrl.btnTitleSendRecom == 'processApplicReCandBtnMsg1'){
                $translate('processApplicConfirm').then(function (msg) {
                    var dlg = dialogs.confirm("aviso", msg);
                    dlg.result.then(function (btn) {
                        $scope.$parent.registerApplic(processApplicRecomCandidateCtrl.applicGralInfo.idPostulacion);
                    }, function (btn) {

                    });
                });
            } else {
                if ($scope.recomCandidate1Form.$valid){
                    var dataRequest = {
                        texto : processApplicRecomCandidateCtrl.textInv,
                        lista : []
                    }
                    for(var i in processApplicRecomCandidateCtrl.candidates){
                        dataRequest.lista.push(
                            {
                                nombre : processApplicRecomCandidateCtrl.candidates[i].firstName,
                                apellido : processApplicRecomCandidateCtrl.candidates[i].lastName,
                                email : processApplicRecomCandidateCtrl.candidates[i].email,
                            }
                        )
                    }
                    $translate('processApplicConfirm').then(function (msg) {
                        var dlg = dialogs.confirm("aviso", msg);
                        dlg.result.then(function(btn){
                            angular.element('#div-loading').show();
                            applicationService.sendRecommendation(dataRequest, processApplicRecomCandidateCtrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                                .then(function (result) {
                                    angular.element('#div-loading').hide();
                                    if (result.status == "OK") {
                                        $scope.$parent.registerApplic(processApplicRecomCandidateCtrl.applicGralInfo.idPostulacion);
                                    }
                                }).catch(function (data) {
                                    angular.element('#div-loading').hide();
                                    if (data.status == "OFF") {
                                        $translate('msgSessionExpired').then(function (msg) {
                                            dialogs.error('Error', msg);
                                        });
                                        $scope.$parent.logout(true);
                                    } else {
                                        if (data.status == null) {
                                            dialogs.error('Error', "null");
                                        } else {
                                            dialogs.error('Error', data.status);
                                        }
                                    }
                                });
                        },function(btn){

                        });
                    });
                } else {
                    $translate('processApplicReCandMsg3').then(function (msg) {
                        dialogs.error('Error', msg);
                    });
                }
            }
        }

    }]);