'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controllers:
 *                                  processApplicSection3Ctrl,
 *                                  univTeachingDialogCtrl,
 *                                  patentDialogCtrl,
 *                                  conferenceDialogCtrl,
 *                                  directedThesisDialogCtrl
 * @description
 * # processApplicSection3Ctrl,
 * # univTeachingDialogCtrl,
 * # patentsDialogCtrl,
 * # conferencesDialogCtrl
 * # directedThesisDialogCtrl
 * Controllers of the prometeoApp
 */

myApplic.controller("processApplicSection3Ctrl", ['catalogsService','applicationService','applicSection3Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(catalogsService,applicationService,applicSection3Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        var processApplicSection3Ctrl = this;

        processApplicSection3Ctrl.initCtrl = function(){
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function(result){
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicSection3Ctrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicSection3Ctrl.classProgress = $scope.$parent.progressBar(processApplicSection3Ctrl.applicGralInfo.avance);
                    applicSection3Service.getUnivTeachings(processApplicSection3Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            catalogsService.getCountrys($scope.connectedUser.userToken)
                                .then(function(result){
                                    angular.element('#div-loading').hide();
                                    processApplicSection3Ctrl.countrys = result;
                                }).catch(function(data){
                                    angular.element('#div-loading').hide();
                                    if(data.status != "OFF"){
                                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                                    }
                                });
                            if(result[0].institucion != "EMPTY"){
                                processApplicSection3Ctrl.univTeachings = result;
                            } else {
                                processApplicSection3Ctrl.univTeachings = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection3Service.getPatents(processApplicSection3Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection3Ctrl.patents = result;
                            } else {
                                processApplicSection3Ctrl.patents = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection3Service.getConferences(processApplicSection3Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection3Ctrl.conferences = result;
                            } else {
                                processApplicSection3Ctrl.conferences = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection3Service.getDirectedThesis(processApplicSection3Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection3Ctrl.directedThesis = result;
                            } else {
                                processApplicSection3Ctrl.directedThesis = [];
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


        processApplicSection3Ctrl.addUnivTeaching = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-univ-teaching.html','univTeachingDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection3Ctrl.countrys,
                action : -1,
                univTeaching : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.editUnivTeaching = function(univTeaching){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-univ-teaching.html','univTeachingDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection3Ctrl.countrys,
                action : univTeaching.id,
                univTeaching : univTeaching
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.deleteUnivTeaching = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection3Service.deleteUnivTeaching(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection3Ctrl.initCtrl();
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

        processApplicSection3Ctrl.instructionsSec3 = function(){
            $translate('processApplicInstrucSec3Msg1').then(function (msg) {
                dialogs.notify($scope.titleInstructions, msg);
            });
        }


        processApplicSection3Ctrl.addPatent = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-patent.html','patentDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                patent : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.editPatent = function(patent){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-patent.html','patentDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                action : patent.id,
                patent : patent
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.deletePatent = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection3Service.deletePatent(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection3Ctrl.initCtrl();
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


        processApplicSection3Ctrl.addConference = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-conference.html','conferenceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection3Ctrl.countrys,
                action : -1,
                conference : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.editConference = function(conference){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-conference.html','conferenceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection3Ctrl.countrys,
                action : conference.id,
                conference : conference
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.deleteConference = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection3Service.deleteConference(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection3Ctrl.initCtrl();
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


        processApplicSection3Ctrl.addDirectedThesis = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-directed-thesis.html','directedThesisDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                directedThesis : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.editDirectedThesis = function(directedThesis){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-directed-thesis.html','directedThesisDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection3Ctrl.applicGralInfo.idPostulacion,
                action : directedThesis.idTesis,
                directedThesis : directedThesis
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection3Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection3Ctrl.deleteDirectedThesis = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection3Service.deleteDirectedThesis(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection3Ctrl.initCtrl();
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

}]);

myApplic.controller("univTeachingDialogCtrl",function(PROPERTIES_APPLIC,applicSection3Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.univTeaching).length !== 0){
        $scope.univTeaching = {
            entity : data.univTeaching.institucion,
            startDate : data.univTeaching.inicio,
            endDate : data.univTeaching.fin,
            description : data.univTeaching.descripcion,
            countrys : data.countrys
        };
        for(var i in data.countrys){
            if(data.countrys[i].id == data.univTeaching.idPais){
                $scope.univTeaching.countrySelected = data.countrys[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.univTeaching = {
            entity : '',
            startDate : '',
            endDate : '',
            description : '',
            countrys : data.countrys
        };
        $scope.dataEmpty = true;
    }
    $scope.descriptionField = 'descripcion';
    if (data.userLanguage == "en_US"){
        $scope.descriptionField = 'description';
    }


    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.univTeachingForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                institucion : $scope.univTeaching.entity,
                idPais : $scope.univTeaching.countrySelected.id,
                inicio : $scope.univTeaching.startDate,
                fin : $scope.univTeaching.endDate,
                descripcion : $scope.univTeaching.description,
                estado : true
            }
            angular.element('#div-loading').show();
            applicSection3Service.setUnivTeaching(dataRequest,data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleInstructions, msg);
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

myApplic.controller("patentDialogCtrl",function(PROPERTIES_APPLIC,applicSection3Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternPatentName = PROPERTIES_APPLIC.regularExpression.name;
    $scope.patternDurationYears = PROPERTIES_APPLIC.regularExpression.number2Digits;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.patent).length !== 0){
        $scope.patent = {
            patentName : data.patent.nombre,
            yearInscription : data.patent.anio,
            durationYears : data.patent.tiempo,
            patentTypes : PROPERTIES_APPLIC.PatentTypes,
            description : data.patent.descripcion
        };
        for(var i in PROPERTIES_APPLIC.PatentTypes){
            if(PROPERTIES_APPLIC.PatentTypes[i].id == data.patent.tipo){
                $scope.patent.patentTypeSelected = PROPERTIES_APPLIC.PatentTypes[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.patent = {
            patentName : '',
            yearInscription : '',
            durationYears : '',
            patentTypes : PROPERTIES_APPLIC.PatentTypes,
            description : ''
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.patentForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                nombre : $scope.patent.patentName,
                anio : parseInt($scope.patent.yearInscription),
                tiempo : parseInt($scope.patent.durationYears),
                tipo : $scope.patent.patentTypeSelected.id,
                descripcion : $scope.patent.description
            }
            angular.element('#div-loading').show();
            applicSection3Service.setPatent(dataRequest,data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleInstructions, msg);
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

myApplic.controller("conferenceDialogCtrl",function(PROPERTIES_APPLIC,applicSection3Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternTitle = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.conference).length !== 0){
        $scope.conference = {
            confTitle : data.conference.titulo,
            description : data.conference.descripcion,
            year : data.conference.anio,
            countrys : data.countrys,
            guestSpeaker : data.conference.invitado,
            oralSpeaker : data.conference.ponenteoral,
            urlFile : data.conference.urlFile,
            nameFile : data.conference.nombreFile
        };
        for(var i in data.countrys){
            if(data.countrys[i].id == data.conference.idPais){
                $scope.conference.countrySelected = data.countrys[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.conference = {
            confTitle : '',
            description : '',
            year : '',
            countrys : data.countrys
        };
        $scope.dataEmpty = true;
    }

    $scope.descriptionField = 'descripcion';
    if (data.userLanguage == "en_US"){
        $scope.descriptionField = 'description';
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.conferenceForm.$valid){
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
                titulo : $scope.conference.confTitle,
                descripcion : $scope.conference.description,
                anio : parseInt($scope.conference.year),
                idPais : $scope.conference.countrySelected.id,
                invitado : $scope.conference.guestSpeaker,
                ponenteoral : $scope.conference.oralSpeaker,
                nombreFile : fileName
            }
            angular.element('#div-loading').show();
            applicSection3Service.setConference(dataRequest, file, data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleInstructions, msg);
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

myApplic.controller("directedThesisDialogCtrl",function(PROPERTIES_APPLIC,applicSection3Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternThesisTitle = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternEstudentName = PROPERTIES_APPLIC.regularExpression.name;
    $scope.patternUniversity = PROPERTIES_APPLIC.regularExpression.university;

    if(Object.keys(data.directedThesis).length !== 0){
        $scope.directedThesis = {
            thesisTitle : data.directedThesis.titulo,
            estudentName : data.directedThesis.nombreEstudiante,
            university : data.directedThesis.nombreUniversidad,
            year : data.directedThesis.anio,
            levels : PROPERTIES_APPLIC.levels
        };
        for(var i in $scope.directedThesis.levels){
            if($scope.directedThesis.levels[i].id == data.directedThesis.nivel){
                $scope.directedThesis.levelSelected = $scope.directedThesis.levels[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.directedThesis = {
            thesisTitle : '',
            estudentName : '',
            university : '',
            year : '',
            levels : PROPERTIES_APPLIC.levels
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.directedThesisForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                titulo : $scope.directedThesis.thesisTitle,
                nombreEstudiante : $scope.directedThesis.estudentName,
                nombreUniversidad : $scope.directedThesis.university,
                anio : parseInt($scope.directedThesis.year),
                nivel : $scope.directedThesis.levelSelected.id
            }
            angular.element('#div-loading').show();
            applicSection3Service.setDirectedThesis(dataRequest, data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleInstructions, msg);
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