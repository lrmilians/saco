'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controllers:
 *                                  processApplicSection4Ctrl
 *                                  workExperienceDialogCtrl,
 *                                  projectDialogCtrl,
 *                                  adviceDialogCtrl,
 *                                  publishedBookDialogCtrl,
 *                                  expCourseDialogCtrl
 *
 * @description
 * processApplicSection4Ctrl
 * # workExperienceDialogCtrl,
 * # projectDialogCtrl,
 * # adviceDialogCtrl,
 * # publishedBookDialogCtrl,
 * # expCourseDialogCtrl
 * Controllers of the prometeoApp
 */

myApplic.controller("processApplicSection4Ctrl", ['PROPERTIES_APPLIC','catalogsService','applicationService','applicSection4Service','$scope','$modal','dialogs','$location','$cookieStore','$translate',
    function(PROPERTIES_APPLIC,catalogsService,applicationService,applicSection4Service,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

        var processApplicSection4Ctrl = this;

        processApplicSection4Ctrl.projectRoles = PROPERTIES_APPLIC.projectRoles;
        processApplicSection4Ctrl.participationsBook = PROPERTIES_APPLIC.participationsBook;

        processApplicSection4Ctrl.patternNumPub = PROPERTIES_APPLIC.regularExpression.number3Digits;

        processApplicSection4Ctrl.initCtrl = function(){
            angular.element('#div-loading').show();
            applicationService.getGeneralInfo($scope.connectedUser.userToken)
                .then(function(result){
                    for(var i in result){
                        if(result[i].instancia == "ENPROGRESO"){
                            processApplicSection4Ctrl.applicGralInfo = result[i];
                        }
                    }
                    processApplicSection4Ctrl.classProgress = $scope.$parent.progressBar(processApplicSection4Ctrl.applicGralInfo.avance);
                    processApplicSection4Ctrl.numPub = '';
                    processApplicSection4Ctrl.btnTitle = 'startApplicBtnSave';
                    if(processApplicSection4Ctrl.applicGralInfo.publicaciones != null){
                        processApplicSection4Ctrl.numPub = processApplicSection4Ctrl.applicGralInfo.publicaciones;
                        processApplicSection4Ctrl.btnTitle = 'startApplicBtnUpdate';
                    }
                    applicSection4Service.getWorkExperiences(processApplicSection4Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection4Ctrl.workExperiences = result;
                            } else {
                                processApplicSection4Ctrl.workExperiences = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection4Service.getProjects(processApplicSection4Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection4Ctrl.projects = result;
                                for(var i in processApplicSection4Ctrl.projects){
                                    for(var j in processApplicSection4Ctrl.projectRoles){
                                        if(processApplicSection4Ctrl.projects[i].participacion == processApplicSection4Ctrl.projectRoles[j].id){
                                            processApplicSection4Ctrl.projects[i].role = processApplicSection4Ctrl.projectRoles[j].description;
                                        }
                                    }
                                }
                            } else {
                                processApplicSection4Ctrl.projects = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection4Service.getAdvices(processApplicSection4Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection4Ctrl.advices = result;
                            } else {
                                processApplicSection4Ctrl.advices = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection4Service.getPublishedBooks(processApplicSection4Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            if(result[0].status != "EMPTY"){
                                processApplicSection4Ctrl.publishedBooks = result;
                                for(var i in processApplicSection4Ctrl.publishedBooks){
                                    for(var j in processApplicSection4Ctrl.participationsBook){
                                        if(processApplicSection4Ctrl.publishedBooks[i].participacion == processApplicSection4Ctrl.participationsBook[j].id){
                                            processApplicSection4Ctrl.publishedBooks[i].role = processApplicSection4Ctrl.participationsBook[j].description;
                                        }
                                    }
                                }
                            } else {
                                processApplicSection4Ctrl.publishedBooks = [];
                            }
                        }).catch(function(data){
                            if(data.status != "OFF"){
                                dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                            }
                        });
                    applicSection4Service.getExpCourses(processApplicSection4Ctrl.applicGralInfo.idPostulacion, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result[0].status != "EMPTY"){
                                processApplicSection4Ctrl.expCourses = result;
                            } else {
                                processApplicSection4Ctrl.expCourses = [];
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


        processApplicSection4Ctrl.addWorkExperience = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-work-experience.html','workExperienceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                workExperience : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.editWorkExperience = function(workExperience){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-work-experience.html','workExperienceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : workExperience.id,
                workExperience : workExperience
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.deleteWorkExperience = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection4Service.deleteWorkExperience(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection4Ctrl.initCtrl();
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

        processApplicSection4Ctrl.instructionsSec4 = function(){
            $translate('processApplicInstrucSec4Msg1').then(function (msg) {
                dialogs.notify($scope.titleInstructions, msg);
            });
        }


        processApplicSection4Ctrl.addProject = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-project.html','projectDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                project : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.editProject = function(project){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-project.html','projectDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : project.id,
                project : project
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.deleteProject = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection4Service.deleteProject(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection4Ctrl.initCtrl();
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


        processApplicSection4Ctrl.addAdvice = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-advice.html','adviceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                advice : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.editAdvice = function(advice){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-advice.html','adviceDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : advice.id,
                advice : advice
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.deleteAdvice = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection4Service.deleteAdvice(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection4Ctrl.initCtrl();
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


        processApplicSection4Ctrl.addPublishedBook = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-published-book.html','publishedBookDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                publishedBook : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.editPublishedBook = function(publishedBook){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-published-book.html','publishedBookDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : publishedBook.id,
                publishedBook : publishedBook
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.deletePublishedBook = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection4Service.deletePublishedBook(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection4Ctrl.initCtrl();
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


        processApplicSection4Ctrl.editPublication = function(){
            if ($scope.publicationForm.$valid){
                var dataRequest = {
                    applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                    numPub : processApplicSection4Ctrl.numPub
                }
                applicSection4Service.setPublication(dataRequest, $scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status == "OK"){
                            processApplicSection4Ctrl.initCtrl();
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


        processApplicSection4Ctrl.addExpCourse = function(){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-exp-course.html','expCourseDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : -1,
                expCourse : {}},'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.editExpCourse = function(expCourse){
            var dlg = dialogs.create('modules/applic/views/dialog-form/form-exp-course.html','expCourseDialogCtrl',{
                userToken : $scope.connectedUser.userToken,
                userLanguage : $scope.connectedUser.userLanguage,
                applicId : processApplicSection4Ctrl.applicGralInfo.idPostulacion,
                action : expCourse.id,
                expCourse : expCourse
            },'lg');
            dlg.result.then(function(result){
                if(result.status == "OK"){
                    processApplicSection4Ctrl.initCtrl();
                }
            },function(){
                if(angular.equals($scope.name,''))
                    $scope.name = 'You did not enter in your name!';
            });
        }

        processApplicSection4Ctrl.deleteExpCourse = function(id){
            $translate('processApplicConfirmMsg1').then(function (msg) {
                var dlg = dialogs.confirm(undefined, msg);
                dlg.result.then(function(btn){
                    angular.element('#div-loading').show();
                    applicSection4Service.deleteExpCourse(id, $scope.connectedUser.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            if(result.status == "OK"){
                                processApplicSection4Ctrl.initCtrl();
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

myApplic.controller("workExperienceDialogCtrl",function(PROPERTIES_APPLIC,applicSection4Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternCharge = $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternMonthsDuration = PROPERTIES_APPLIC.regularExpression.number2Digits;
    $scope.patternActivities = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.workExperience).length !== 0){
        $scope.workExperience = {
            charge : data.workExperience.cargo,
            entity : data.workExperience.institucion,
            monthsDuration : data.workExperience.duracion,
            startYear : data.workExperience.anioInicio,
            endYear : data.workExperience.anioFin,
            activities : data.workExperience.actividades,
            job : data.workExperience.trabaja,
            nameFile : data.workExperience.nombreFile,
            urlFile : data.workExperience.urlFile
        };
        $scope.dataEmpty = false;
    } else {
        $scope.univTeaching = {
            charge : '',
            entity : '',
            monthsDuration : '',
            startYear : '',
            endYear : '',
            activities : '',
            job : ''
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
        if ($scope.workExperienceForm.$valid){
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
                cargo : $scope.workExperience.charge,
                institucion : $scope.workExperience.entity,
                duracion : parseInt($scope.workExperience.monthsDuration),
                anioInicio : parseInt($scope.workExperience.startYear),
                anioFin : parseInt($scope.workExperience.endYear),
                actividades : $scope.workExperience.activities,
                trabaja : $scope.workExperience.job,
                nombreFile : fileName
            }
            angular.element('#div-loading').show();
            applicSection4Service.setWorkExperience(dataRequest, file, data.action, data.userToken)
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

myApplic.controller("projectDialogCtrl",function(PROPERTIES_APPLIC,applicSection4Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternProjectName = $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.project).length !== 0){
        $scope.project = {
            projectName : data.project.proyecto,
            entity : data.project.institucion,
            description : data.project.descripcion,
            projectRoles : PROPERTIES_APPLIC.projectRoles
        };
        for(var i in PROPERTIES_APPLIC.projectRoles){
            if(PROPERTIES_APPLIC.projectRoles[i].id == data.project.participacion){
                ;
                $scope.project.projectRoleSelected = PROPERTIES_APPLIC.projectRoles[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.project = {
            projectName : '',
            entity : '',
            description : '',
            projectRoles : PROPERTIES_APPLIC.projectRoles
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
        if ($scope.projectForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                proyecto : $scope.project.projectName,
                institucion : $scope.project.entity,
                descripcion : $scope.project.description,
                participacion : $scope.project.projectRoleSelected.id
            }
            angular.element('#div-loading').show();
            applicSection4Service.setProject(dataRequest, data.action, data.userToken)
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

myApplic.controller("adviceDialogCtrl",function(PROPERTIES_APPLIC,applicSection4Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternDescription = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.advice).length !== 0){
        $scope.advice = {
            entity : data.advice.institucion,
            description : data.advice.descripcion
        };
        $scope.dataEmpty = false;
    } else {
        $scope.advice = {
            entity : '',
            description : ''
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.adviceForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                institucion : $scope.advice.entity,
                descripcion : $scope.advice.description
            }
            angular.element('#div-loading').show();
            applicSection4Service.setAdvice(dataRequest, data.action, data.userToken)
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
                            dialogs.error('Error',msg);
                        });
                        $scope.$parent.logout(true);
                    } else {
                        dialogs.error('Error', "codError:" + data.codError + " status: " + data.status);
                    }
                });
        }
    };
})

myApplic.controller("publishedBookDialogCtrl",function(PROPERTIES_APPLIC,applicSection4Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.patternTitle = $scope.patternChapter = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternEditorial = PROPERTIES_APPLIC.regularExpression.description;

    if(Object.keys(data.publishedBook).length !== 0){
        $scope.publishedBook = {
            participationsBook : PROPERTIES_APPLIC.participationsBook,
            title : data.publishedBook.titulo,
            chapter : data.publishedBook.coautor,
            editorial : data.publishedBook.editorial,
            pubYear : data.publishedBook.anio
        };
        for(var i in PROPERTIES_APPLIC.participationsBook){
            if(PROPERTIES_APPLIC.participationsBook[i].id == data.publishedBook.participacion){
                $scope.publishedBook.participationBookSelected = PROPERTIES_APPLIC.participationsBook[i];
            }
        }
        $scope.dataEmpty = false;
    } else {
        $scope.publishedBook = {
            participationsBook : PROPERTIES_APPLIC.participationsBook,
            title : '',
            editorial : '',
            pubYear : ''
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.publishedBookForm.$valid){
            var dataRequest = {
                idPostulacion : data.applicId,
                participacion : $scope.publishedBook.participationBookSelected.id,
                titulo : $scope.publishedBook.title,
                coautor : $scope.publishedBook.chapter,
                editorial : $scope.publishedBook.editorial,
                anio : parseInt($scope.publishedBook.pubYear)
            }
            console.log(dataRequest);
            angular.element('#div-loading').show();
            applicSection4Service.setPublishedBook(dataRequest, data.action, data.userToken)
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

myApplic.controller("expCourseDialogCtrl",function(PROPERTIES_APPLIC,applicSection4Service,catalogsService,catalogsApplicService,applicationService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.file = {};

    $scope.patternTitle = $scope.patternEntity = PROPERTIES_APPLIC.regularExpression.entity;
    $scope.patternEditorial = PROPERTIES_APPLIC.regularExpression.description;
    $scope.patternHours = PROPERTIES_APPLIC.regularExpression.number3Digits;

    if(Object.keys(data.expCourse).length !== 0){
        $scope.expCourse = {
            title : data.expCourse.titulo,
            entity : data.expCourse.institucion,
            hours : data.expCourse.numeroHoras,
            nameFile : data.expCourse.nombreFile,
            urlFile : data.expCourse.urlFile
        };
        $scope.dataEmpty = false;
    } else {
        $scope.expCourse = {
            title : '',
            entity : '',
            hours : '',
            nameFile : '',
            urlFile : ''
        };
        $scope.dataEmpty = true;
    }

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if ($scope.expCourseForm.$valid){
            if ($scope.dataEmpty == true && $scope.file.name == undefined) {
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
                    idPostulacion: data.applicId,
                    titulo: $scope.expCourse.title,
                    institucion: $scope.expCourse.entity,
                    numeroHoras: parseInt($scope.expCourse.hours),
                    nombreFile: fileName
                }
                angular.element('#div-loading').show();
                applicSection4Service.setExpCourse(dataRequest, file, data.action, data.userToken)
                    .then(function (result) {
                        angular.element('#div-loading').hide();
                        if (result.status == "OK") {
                            $translate('processApplicDialogMsg1').then(function (msg) {
                                dialogs.notify($scope.titleNotice, msg);
                            });
                            $modalInstance.close(result);
                        } else {
                            dialogs.error('Error', result.status);
                        }
                    }).catch(function (data) {
                        angular.element('#div-loading').hide();
                        if (data.status == "OFF") {
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