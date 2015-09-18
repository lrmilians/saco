'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:
 *                                  dashboardCtrl,
 *                                  applicDialog,
 *                                  searchApplicDialogCtrl,
 *                                  educationDetailDialogCtrl
 *                                  previousContactDialogCtrl
 * @description
 * # dashboardCtrl,
 * # applicDialog,
 * # searchApplicDialogCtrl
 * # educationDetailDialogCtrl
 * # previousContactDialogCtrl
 * Controller of the prometeoApp
 */
myAdmin.controller("dashboardCtrl", ['dashboardService','applicationService','catalogsService','catalogsApplicService','applicSection5Service','$scope','$modal','dialogs','$location','$cookieStore','$translate','RouteArgs',
            function(dashboardService,applicationService,catalogsService,catalogsApplicService,applicSection5Service,$scope,$modal,dialogs,$location,$cookieStore,$translate,RouteArgs) {

    var dashboardCtrl = this;
    dashboardCtrl.currentPage = 1;
    dashboardCtrl.pageSize = 15;
    dashboardCtrl.totalRecords = 0;
    dashboardCtrl.advanceSearch = false;

    dashboardCtrl.dataRequest = {
                    pid : "",
                    perfil : "",
                    nombre : "",
                    apellido : "",
                    paisNacimiento : "",
                    paisResidencia : "",
                    proceso : "",
                    inicio : 0,
                    fin : dashboardCtrl.pageSize
                };

    $scope.styleScrollNotifications = $scope.styleScrollProccess = {};

    if($cookieStore.get('user') == undefined){
        $location.path("/");
    } else {
        dashboardCtrl.userToken = $cookieStore.get('user').userToken;
    }
    dashboardCtrl.user = $cookieStore.get('user');
    dashboardCtrl.language = $cookieStore.get('NG_TRANSLATE_LANG_KEY');

    dashboardCtrl.selectProfileType = function () {
        if(dashboardCtrl.startedApplic){
            $location.path('/section1-general-information');
        } else {
            $location.path('/select-profile-type');
        }
    }

    dashboardCtrl.initCtrl = function(){
        angular.element('#div-loading').show();
        dashboardService.getNotifications(dashboardCtrl.userToken)
            .then(function(result){
                dashboardCtrl.notifications = result;
                dashboardCtrl.noReadNotifCount = 0;
                for(var i in dashboardCtrl.notifications){
                    if(!dashboardCtrl.notifications[i].leido){
                        dashboardCtrl.noReadNotifCount++;
                    }
                }
                if($translate.use() == "es_ES"){
                    for(var j in dashboardCtrl.notifications){
                        dashboardCtrl.notifications[j].creado = dashboardCtrl.notifications[j].creado.substr(3,2) + "/" + dashboardCtrl.notifications[j].creado.substr(0,2) + "/" + dashboardCtrl.notifications[j].creado.substr(6,4) + dashboardCtrl.notifications[j].creado.substr(10,9);
                    }
                }
            }).catch(function(data){
                if(data.status !== "OFF"){
                    if(data.status == null){
                        dialogs.error('Error', "null");
                    } else {
                        dialogs.error('Error', data.status);
                    }
                }
            });
        if(dashboardCtrl.user.userRole == "Postulante"){
            applicationService.getGeneralInfo(dashboardCtrl.userToken)
                .then(function(result){
                    dashboardCtrl.applications = [];
                    if(result.status === "NONE"){
                        dashboardCtrl.sendApplic = false;
                        dashboardCtrl.startedApplic = false;
                        dashboardCtrl.startedApplicBtn = 'dashboardBtnStartApplication';
                    } else {
                        dashboardCtrl.applications = result;
                        for(var i in dashboardCtrl.applications){
                            switch (dashboardCtrl.applications[i].instancia){
                                case "ENVIADO":
                                    dashboardCtrl.sendApplic = true;
                                    break;
                                case "ENPROGRESO":
                                    dashboardCtrl.sendApplic = false;
                                    dashboardCtrl.startedApplic = true;
                                    dashboardCtrl.startedApplicBtn = 'dashboardBtnStartedApplication';
                                    dashboardCtrl.classProgress = $scope.$parent.progressBar(dashboardCtrl.applications[i].avance);
                                    break;
                            }
                        }
                    }
                    dashboardService.getProccess(dashboardCtrl.userToken)
                        .then(function(result){
                            angular.element('#div-loading').hide();
                            dashboardCtrl.proccess = [];
                            if(result.status !== "NONE"){
                                dashboardCtrl.proccess = result;
                                if($translate.use() == "es_ES"){
                                    for(var i in dashboardCtrl.proccess){
                                        dashboardCtrl.proccess[i].fechaInicio = dashboardCtrl.proccess[i].fechaInicio.substr(3,2) + "/" + dashboardCtrl.proccess[i].fechaInicio.substr(0,2) + "/" + dashboardCtrl.proccess[i].fechaInicio.substr(6,4) + dashboardCtrl.proccess[i].fechaInicio.substr(10,9);
                                        dashboardCtrl.proccess[i].fechaFin = dashboardCtrl.proccess[i].fechaFin.substr(3,2) + "/" + dashboardCtrl.proccess[i].fechaFin.substr(0,2) + "/" + dashboardCtrl.proccess[i].fechaFin.substr(6,4) + dashboardCtrl.proccess[i].fechaFin.substr(10,9);
                                    }
                                }
                            }
                        }).catch(function(data){
                            angular.element('#div-loading').hide();
                            if(data.status !== "OFF"){
                                if(data.status == null){
                                    dialogs.error('Error', "null");
                                } else {
                                    dialogs.error('Error', data.status);
                                }
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
        if(dashboardCtrl.user.userRole == "Analista"){
            angular.element('#div-loading').show();
            catalogsService.getCountrys($scope.connectedUser.userToken)
                .then(function(result){
                    dashboardCtrl.countrys = result;
                }).catch(function(data){
                    if(data.status != "OFF"){
                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                    }
                });
            catalogsApplicService.getTitles($scope.connectedUser.userToken)
                .then(function(result){
                    dashboardCtrl.titles = result;
                }).catch(function(data){
                    if(data.status != "OFF"){
                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                    }
                });
            applicSection5Service.getInstitutions($scope.connectedUser.userToken)
                .then(function(result){
                    dashboardCtrl.institutions = result;
                }).catch(function(data){
                    if(data.status != "OFF"){
                        dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                    }
                });
            var indexValue = (dashboardCtrl.currentPage - 1) * dashboardCtrl.pageSize;
            dashboardCtrl.dataRequest.inicio = indexValue;
            dashboardCtrl.getApplications(dashboardCtrl.dataRequest);
            angular.element('#div-loading').hide();
        }
    }

    dashboardCtrl.pageChangeHandler = function(newPageNumber){
        dashboardCtrl.currentPage = newPageNumber;
        var indexValue = (dashboardCtrl.currentPage - 1) * dashboardCtrl.pageSize;
        dashboardCtrl.dataRequest.inicio =  indexValue;
        dashboardCtrl.getApplications(dashboardCtrl.dataRequest);
    }

    dashboardCtrl.resetSearch = function(){
        dashboardCtrl.dataRequest = {
            pid : "",
            perfil : "",
            nombre : "",
            apellido : "",
            paisNacimiento : "",
            paisResidencia : "",
            proceso : "",
            inicio : 0,
            fin : dashboardCtrl.pageSize
        }
        dashboardCtrl.advanceSearch = false;
        dashboardCtrl.getApplications(dashboardCtrl.dataRequest);
    }

    dashboardCtrl.viewNotification = function(id, read, notification){
        var title = "Detalle notificación";
        if(dashboardCtrl.language == "en_US"){
            var title = "Detail notice";
        }
        if(!read){
            angular.element('#div-loading').show();
            dashboardService.setReadNotification(id, dashboardCtrl.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        dashboardCtrl.initCtrl();
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
        dialogs.notify(title, notification);
    }

    dashboardCtrl.viewProccess = function(procces){
        var title = "Detalle notificación";
        if(dashboardCtrl.language == "en_US"){
            var title = "Detail notice";
        }
        var dlg = dialogs.create('modules/admin/views/dialog-view/view-applic.html','applicDialogCtrl',{
            procces : procces, classProgress : dashboardCtrl.classProgress},'lg');
        dlg.result.then(function(result){
            if(result.status == "OK"){
                dashboardCtrl.initCtrl();
            }
        },function(){
            if(angular.equals($scope.name,''))
                $scope.name = 'You did not enter in your name!';
        });
    }

    dashboardCtrl.searchApplication = function(){
        angular.element('#div-loading').show();
        var dlg = dialogs.create('modules/admin/views/dialog-form/form-search-application.html','searchApplicDialogCtrl',{
            countrys : dashboardCtrl.countrys, searchCriteria : dashboardCtrl.dataRequest
        },'lg');
        dlg.result.then(function(result){
            dashboardCtrl.currentPage = 1;
            var indexValue = (dashboardCtrl.currentPage - 1) * dashboardCtrl.pageSize;
            dashboardCtrl.dataRequest.pid = result.pid;
            if(result.perfil != ""){
                dashboardCtrl.dataRequest.perfil = result.perfil.id;
            } else {
                dashboardCtrl.dataRequest.perfil = result.perfil;
            }
            dashboardCtrl.dataRequest.nombre = result.nombre;
            dashboardCtrl.dataRequest.apellido = result.apellido;
            if(result.paisNacimiento != ""){
                dashboardCtrl.dataRequest.paisNacimiento = result.paisNacimiento.id;
            } else {
                dashboardCtrl.dataRequest.paisNacimiento = result.paisNacimiento;
            }
            if(result.paisResidencia != ""){
                dashboardCtrl.dataRequest.paisResidencia = result.paisResidencia.id;
            } else {
                dashboardCtrl.dataRequest.paisResidencia = result.paisResidencia;
            }
            dashboardCtrl.dataRequest.inicio = indexValue;

            if(dashboardCtrl.dataRequest.pid != "" || dashboardCtrl.dataRequest.perfil != "" || dashboardCtrl.dataRequest.nombre != "" ||
                dashboardCtrl.dataRequest.apellido != "" || dashboardCtrl.dataRequest.paisNacimiento != "" || dashboardCtrl.dataRequest.paisResidencia != "" ||
                dashboardCtrl.dataRequest.proceso != ""){
                dashboardCtrl.advanceSearch = true;
            }
            dashboardCtrl.getApplications(dashboardCtrl.dataRequest);

        },function(){
            if(angular.equals($scope.name,''))
                $scope.name = 'You did not enter in your name!';
        });
    }

    dashboardCtrl.viewEducationDetail = function(applicId){
        angular.element('#div-loading').show();
        var dlg = dialogs.create('modules/admin/views/dialog-view/view-education-detail.html','educationDetailDialogCtrl',{
            applicId : applicId,
            userToken : $scope.connectedUser.userToken,
            countrys : dashboardCtrl.countrys,
            titles :  dashboardCtrl.titles
        },'lg');
        dlg.result.then(function(result){

        },function(){
            if(angular.equals($scope.name,''))
                $scope.name = 'You did not enter in your name!';
        });
    }

    dashboardCtrl.viewPreviousContact = function(applicId){
        angular.element('#div-loading').show();
        var dlg = dialogs.create('modules/admin/views/dialog-view/view-previous-contact.html','previousContactDialogCtrl',{
            applicId : applicId,
            userToken : $scope.connectedUser.userToken,
            institutions : dashboardCtrl.institutions
        },'lg');
        dlg.result.then(function(result){

        },function(){
            if(angular.equals($scope.name,''))
                $scope.name = 'You did not enter in your name!';
        });
    }

    dashboardCtrl.getApplications = function(dataRequest){
        angular.element('#div-loading').show();
        dashboardService.getApplications(dashboardCtrl.userToken, dataRequest)
            .then(function(result){
                angular.element('#div-loading').hide();
                if(result.status != "EMPTY"){
                    dashboardCtrl.applicationsProccess = result;
                    dashboardCtrl.totalRecords = dashboardCtrl.applicationsProccess[0].regs;
                    var resultDateSince;
                    for(var i in dashboardCtrl.applicationsProccess) {
                        resultDateSince = dashboardService.getDateSince(dashboardCtrl.applicationsProccess[i].fechaFin.substr(0,10), "-");
                        dashboardCtrl.applicationsProccess[i].fechaDesde = resultDateSince.year + resultDateSince.month + resultDateSince.day;
                        dashboardCtrl.applicationsProccess[i].tipoPostulacionNombre = "Investigador";
                        if(dashboardCtrl.applicationsProccess[i].tipoPostulacion == "D"){
                            dashboardCtrl.applicationsProccess[i].tipoPostulacionNombre = "Docente";
                        }

                    }
                } else {
                    dashboardCtrl.applicationsProccess = [];
                    dashboardCtrl.totalRecords = 0;
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

    dashboardCtrl.selectScale = function(application){
       // $location.path('/select-scale/' + application.idPostulacion  + '/' + application.tipoPostulacion + '/' + application.nombres + '/' + application.apellidos + '/' + application.email + '/' + application.tipoPostulacionNombre);
        RouteArgs.data.application = {};
        RouteArgs.data.application = application;
        $location.url("/select-scale");
    };

}]);

myAdmin.controller("applicDialogCtrl",function($scope,$modalInstance,data){
    $scope.procces = data.procces;
    $scope.classProgress = data.classProgress;

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };
});

myAdmin.controller("searchApplicDialogCtrl",function($scope,$modalInstance,data){
    angular.element('#div-loading').hide();
    $scope.searchCriteria = {
        pid : data.searchCriteria.pid,
        nombre : data.searchCriteria.nombre,
        apellido : data.searchCriteria.apellido,
        proceso : data.searchCriteria.proceso
    };

    $scope.searchCriteria.birthCountrys = $scope.searchCriteria.residenceCountrys = data.countrys;
    if(data.searchCriteria.paisNacimiento !== ""){
        for(var i in $scope.searchCriteria.birthCountrys){
            if($scope.searchCriteria.birthCountrys[i].id == data.searchCriteria.paisNacimiento){
                $scope.searchCriteria.paisNacimiento = $scope.searchCriteria.birthCountrys[i];
            }
        }
    } else {
        $scope.searchCriteria.paisNacimiento = "";
    }
    if(data.searchCriteria.paisResidencia !== ""){
        for(var i in $scope.searchCriteria.birthCountrys){
            if($scope.searchCriteria.birthCountrys[i].id == data.searchCriteria.paisResidencia){
                $scope.searchCriteria.paisResidencia = $scope.searchCriteria.birthCountrys[i];
            }
        }
    } else {
        $scope.searchCriteria.paisResidencia = "";
    }

    $scope.searchCriteria.profiles = [
        {id : "I", description : "Investigador"},
        {id : "D", description : "Docente"}
    ];

    if(data.searchCriteria.perfil !== ""){
        for(var i in $scope.searchCriteria.profiles){
            if($scope.searchCriteria.profiles[i].id == data.searchCriteria.perfil){
                $scope.searchCriteria.perfil = $scope.searchCriteria.profiles[i];
            }
        }
    } else {
        $scope.searchCriteria.perfil = "";
    }


    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.submitForm = function(){
        if($scope.searchCriteria.perfil == null || $scope.searchCriteria.perfil == ""){
            $scope.searchCriteria.perfil = "";
        }
        if($scope.searchCriteria.paisNacimiento == null || $scope.searchCriteria.paisNacimiento == ""){
            $scope.searchCriteria.paisNacimiento = "";
        }
        if($scope.searchCriteria.paisResidencia == null || $scope.searchCriteria.paisResidencia == ""){
            $scope.searchCriteria.paisResidencia = "";
        }
        $modalInstance.close($scope.searchCriteria);
    }

});

myAdmin.controller("educationDetailDialogCtrl",function(applicSection2Service,$scope,$modalInstance,data){

    $scope.educations = [];

    applicSection2Service.getEducations(data.applicId, data.userToken)
        .then(function(result){
            angular.element('#div-loading').hide();
            if(result.status !== "EMPTY"){
                $scope.educations = result;
                for(var i in $scope.educations){
                    $scope.educations[i].fechaInicio = $scope.educations[i].fechaInicio.substr(3,2) + "/" + $scope.educations[i].fechaInicio.substr(0,2) + "/" + $scope.educations[i].fechaInicio.substr(6,4);
                    $scope.educations[i].fechaFin = $scope.educations[i].fechaFin.substr(3,2) + "/" + $scope.educations[i].fechaFin.substr(0,2) + "/" + $scope.educations[i].fechaFin.substr(6,4);
                    for(var j in data.countrys){
                        if(data.countrys[j].id == $scope.educations[i].pais){
                            $scope.educations[i].paisNombre = data.countrys[j].descripcion;
                        }
                    }
                    for(var k in data.titles){
                        if(data.titles[k].id == $scope.educations[i].tituloObtenido){
                            $scope.educations[i].tituloObtenidoNombre = data.titles[k].descripcion;
                        }
                    }
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
                if(data.status == null){
                    dialogs.error('Error', "null");
                } else {
                    dialogs.error('Error', data.status);
                }
            }
        });


    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

});

myAdmin.controller("previousContactDialogCtrl",function(applicSection5Service,$scope,$modalInstance,data){

    $scope.previousContact = {dataEmpty : true};

    applicSection5Service.getPreviousContact(data.applicId, data.userToken)
        .then(function(result){
            angular.element('#div-loading').hide();
            if(result.status != "NONE"){
                $scope.previousContact.dataEmpty = false;
                $scope.previousContact.acronym = result.siglas;
                $scope.previousContact.contactName = result.nombre;
                $scope.previousContact.contactEmail = result.email;

                for(var i in data.institutions){
                    if(data.institutions[i].id == result.idInstitucion){
                        $scope.previousContact.institutionName = data.institutions[i].descripcion;
                    }
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
                if(data.status == null){
                    dialogs.error('Error', "null");
                } else {
                    dialogs.error('Error', data.status);
                }
            }
        });

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

});