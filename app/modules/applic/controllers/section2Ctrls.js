'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controllers:
 *                                  processApplicSection2Ctrl,
 *                                  educationDialogCtrl,
 *                                  languageDialogCtrl,
 *                                  postdocDialogCtrl
 * @description
 * # processApplicSection2Ctrl,
 * # educationDialogCtrl,
 * # languageDialogCtrl
 * # postdocDialogCtrl
 * Controllers of the prometeoApp
 */

myApplic.controller("processApplicSection2Ctrl", ['PROPERTIES_APPLIC','catalogsService','catalogsApplicService','applicationService','applicSection2Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(PROPERTIES_APPLIC,catalogsService,catalogsApplicService,applicationService,applicSection2Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        var processApplicSection2Ctrl = this;

        processApplicSection2Ctrl.abilitys = PROPERTIES_APPLIC.AbilitysLanguage;

        processApplicSection2Ctrl.initCtrl = function(){
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function(result){
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicSection2Ctrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicSection2Ctrl.classProgress = $scope.$parent.progressBar(processApplicSection2Ctrl.applicGralInfo.avance);
                    applicSection2Service.getEducations(processApplicSection2Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection2Ctrl.degrees = result;
                            } else {
                                processApplicSection2Ctrl.degrees = [];
                            }
                            catalogsService.getCountrys($scope.connectedUser.userToken)
                                .then(function(result){
                                    processApplicSection2Ctrl.countrys = result;
                                }).catch(function(data){
                                    angular.element('#div-loading').hide();
                                    if(data.status != "OFF"){
                                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                                    }
                                });
                            catalogsApplicService.getTitles($scope.connectedUser.userToken)
                                .then(function(result){
                                    processApplicSection2Ctrl.titles = result;
                                }).catch(function(data){
                                    angular.element('#div-loading').hide();
                                    if(data.status != "OFF"){
                                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                                    }
                                });
                            catalogsApplicService.getAreasExpertise($scope.connectedUser.userToken)
                                .then(function(result){
                                    angular.element('#div-loading').hide();
                                    processApplicSection2Ctrl.areasExpertise = result;
                                }).catch(function(data){
                                    if(data.status != "OFF"){
                                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                                    }
                                });
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection2Service.getLanguages(processApplicSection2Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection2Ctrl.languages = result;
                            } else {
                                processApplicSection2Ctrl.languages = [];
                            }
                            catalogsApplicService.getLanguages($scope.connectedUser.userToken)
                                .then(function(result){
                                    processApplicSection2Ctrl.langs = result;
                                }).catch(function(data){
                                    if(data.status != "OFF"){
                                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                                    }
                                });
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection2Service.getPostdocs(processApplicSection2Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection2Ctrl.postdocs = result;
                                processApplicSection2Ctrl.postdoc = true;
                            } else {
                                processApplicSection2Ctrl.postdocs = [];
                                processApplicSection2Ctrl.postdoc = false;
                            }
                        }).catch(function(data){
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


        processApplicSection2Ctrl.addEducation = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-education.html','educationDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection2Ctrl.countrys,
                titles : processApplicSection2Ctrl.titles,
                areasExpertise : processApplicSection2Ctrl.areasExpertise,
                action : -1,
                education : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.editEducation = function(education){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-education.html','educationDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                countrys : processApplicSection2Ctrl.countrys,
                titles : processApplicSection2Ctrl.titles,
                areasExpertise : processApplicSection2Ctrl.areasExpertise,
                action : education.id,
                education : education
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.deleteEducation = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection2Service.deleteEducation(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection2Ctrl.initCtrl();
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

        processApplicSection2Ctrl.instructionsSec2 = function(){
            $translate('processApplicInstrucSec2Msg1').then(function (msg) {
                dialogs.notify($scope.titleInstructions, msg);
            });
        }


        processApplicSection2Ctrl.addLanguage = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-language.html','languageDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                languages : processApplicSection2Ctrl.langs,
                action : -1,
                lang : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.editLanguage = function(lang){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-language.html','languageDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                languages : processApplicSection2Ctrl.langs,
                action : lang.idLenguaje,
                lang : lang
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.deleteLanguage = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection2Service.deleteLanguage(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection2Ctrl.initCtrl();
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


        processApplicSection2Ctrl.addPostdoc = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-postdoc.html','postdocDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                postdoc : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.editPostdoc = function(postdoc){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-postdoc.html','postdocDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection2Ctrl.applicGralInfo.idPostulacion,
                action : postdoc.id,
                postdoc : postdoc
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection2Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection2Ctrl.deletePostdoc = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection2Service.deletePostdoc(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection2Ctrl.initCtrl();
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

myApplic.controller("educationDialogCtrl", function(PROPERTIES_APPLIC,applicSection2Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternTitle = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternUniversity = PROPERTIES_APPLIC.regularExpression.university;

    if(Object.keys(data.education).length !== 0){
        $scope.education = {
            title : data.education.titulo,
            university : data.education.universidad,
            startDate : data.education.fechaInicio.substring(0, 10),
            endDate : data.education.fechaFin.substring(0, 10),
            countrys : data.countrys,
            getTitles : data.titles,
            areasExpertise : data.areasExpertise,
            subAreasExpertise : data.areasExpertise[0].subespecializacion,
            nameFile : data.education.nombreFile,
            urlFile : data.education.urlFile
        };
        for(var i in $scope.education.countrys){
            if($scope.education.countrys[i].id == data.education.pais){
                $scope.education.countrySelected = $scope.education.countrys[i];
            }
        }
        for(var i in $scope.education.getTitles){
            if($scope.education.getTitles[i].id == data.education.tituloObtenido){
                $scope.education.getTitleSelected = $scope.education.getTitles[i];
            }
        }
        for(var i in $scope.education.areasExpertise){
            if($scope.education.areasExpertise[i].id == data.education.especializacion){
                $scope.education.areaExpertiseSelected = $scope.education.areasExpertise[i];
                $scope.education.subAreasExpertise = $scope.education.areasExpertise[i].subespecializacion;
                for(var j in $scope.education.areasExpertise[i].subespecializacion){
                    if($scope.education.areasExpertise[i].subespecializacion[j].id == data.education.subespecializacion){
                        $scope.education.subAreaExpertiseSelected = $scope.education.areasExpertise[i].subespecializacion[j];
                    }
                }
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.education = {
            title : '',
            university : '',
            startDate : '',
            endDate : '',
        };
        $scope.education.countrys = data.countrys;
        $scope.education.getTitles = data.titles,
        $scope.education.areasExpertise = data.areasExpertise;
        $scope.dataEmpty = true;
    }
    $scope.descriptionField = 'descripcion';
    if (data.userLanguage == "en_US"){
        $scope.descriptionField = 'description';
    }

    $scope.areaChanged = function(){
        if($scope.education.areaExpertiseSelected == undefined){
            $scope.education.subAreasExpertise = undefined;
        } else {
            $scope.education.subAreasExpertise = $scope.education.areaExpertiseSelected.subespecializacion;
        }
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.educationForm.$valid){
            if($scope.dataEmpty == true && $scope.file.name == undefined){
                $translate('processApplicDialogMsg2').then(function (msg) {
                    dialogs.error('Error', msg);
                });
            } else {
                var fileName;
                var file;
                if($scope.file.name == undefined){
                    fileName = null;
                    file = null;
                } else {
                    fileName = $scope.file.name;
                    file = $scope.file;
                }
                var dataRequest = {
                    idPostulacion : data.applicId,
                    titulo : $scope.education.title,
                    especializacion : $scope.education.areaExpertiseSelected.id,
                    subespecializacion : $scope.education.subAreaExpertiseSelected.id,
                    universidad : $scope.education.university,
                    pais : $scope.education.countrySelected.id,
                    fechaInicio : $scope.education.startDate,
                    fechaFin : $scope.education.endDate,
                    tituloObtenido : $scope.education.getTitleSelected.id,
                    nombreFile : fileName,
                    estado : true
                }
                if($translate.use() == "en_US"){
                    dataRequest.fechaInicio = $scope.education.startDate.substr(3,2) + "/" + $scope.education.startDate.substr(0,2) + "/" + $scope.education.startDate.substr(6,4);
                    dataRequest.fechaFin = $scope.education.endDate.substr(3,2) + "/" + $scope.education.endDate.substr(0,2) + "/" + $scope.education.endDate.substr(6,4);
                }
                angular.element('#div-loading').show();
                applicSection2Service.setEducation(dataRequest, file, data.action, data.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status == "OK"){
                            $translate('processApplicDialogMsg1').then(function (msg) {
                                dialogs.notify(undefined, msg);
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
        }

    };
})

myApplic.controller("languageDialogCtrl",function(PROPERTIES_APPLIC,applicSection2Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.lang = {};
    $scope.lang.abilitys = PROPERTIES_APPLIC.AbilitysLanguage;

    if(Object.keys(data.lang).length !== 0){
        $scope.lang.languages = data.languages;
        for (var i in $scope.lang.languages){
            if($scope.lang.languages[i].id == data.lang.catalogoId){
                $scope.lang.languageSelected = $scope.lang.languages[i];
            }
        }
        $scope.lang.abilitySelected = $scope.lang.abilitys[data.lang.nivel];
        $scope.dataEmpty = false;
    } else {
        $scope.lang.languages = data.languages;
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
        if ($scope.languageForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                lenguaje : $scope.lang.languageSelected.id,
                nivel : $scope.lang.abilitySelected.id
            }
            angular.element('#div-loading').show();
            applicSection2Service.setLanguage(dataRequest, data.action, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify(undefined, msg);
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

myApplic.controller("postdocDialogCtrl",function(PROPERTIES_APPLIC,applicSection2Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternEntity = $scope.patternInvestigation = PROPERTIES_APPLIC.regularExpression.entity;

    if(Object.keys(data.postdoc).length !== 0){
        $scope.postdoc = {
            investigation : data.postdoc.nombreInvestigacion,
            entity : data.postdoc.institucion,
            startDate : data.postdoc.fechaInicio.substr(0,10),
            endDate : data.postdoc.fechaFin.substr(0,10),
            nameFile : data.postdoc.nombreFile,
            urlFile : data.postdoc.urlFile
        };
        $scope.dataEmpty = false;
    } else {
        $scope.postdoc = {
            investigation : '',
            entity : '',
            nameFile : '',
            urlFile : ''
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.postdocForm.$valid){
            if($scope.dataEmpty == true && $scope.file.name == undefined){
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
                    idPostulacion : data.applicId,
                    nombreInvestigacion : $scope.postdoc.investigation,
                    institucion : $scope.postdoc.entity,
                    fechaInicio : $scope.postdoc.startDate,
                    fechaFin : $scope.postdoc.endDate,
                    nombreFile : fileName
                }
                if($translate.use() == "en_US"){
                    dataRequest.fechaInicio = $scope.postdoc.startDate.substr(3,2) + "/" + $scope.postdoc.startDate.substr(0,2) + "/" + $scope.postdoc.startDate.substr(6,4);
                    dataRequest.fechaFin = $scope.postdoc.endDate.substr(3,2) + "/" + $scope.postdoc.endDate.substr(0,2) + "/" + $scope.postdoc.endDate.substr(6,4);
                }
                angular.element('#div-loading').show();
                applicSection2Service.setPostdoc(dataRequest, file, data.action, data.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status == "OK"){
                            $translate('processApplicDialogMsg1').then(function (msg) {
                                dialogs.notify(undefined, msg);
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
        }
    };
})