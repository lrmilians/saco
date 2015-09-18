'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:processApplicCtrl
 * @description
 * # processApplicCtrl
 * Controller of the prometeoApp
 */
myApplic.controller("processApplicCtrl", ['catalogsService','applicationService','$scope','PROPIEDADES','PROPERTIES_APPLIC','$modal','dialogs','$location','$cookieStore','$translate',
            function(catalogsService,applicationService,$scope,PROPIEDADES,PROPERTIES_APPLIC,$modal,dialogs,$location,$cookieStore,$translate) {

    var processApplicCtrl = this;


    $scope.file = {};

    $scope.patternPassport = PROPERTIES_APPLIC.regularExpression.passport;

    processApplicCtrl.initCtrl = function(){
        processApplicCtrl.genders = PROPIEDADES.propiedades.Genders;

        catalogsService.getCountrys($scope.connectedUser.userToken)
            .then(function(result){
                processApplicCtrl.countrys = result;
            }).catch(function(data){
                if(data.status != "OFF"){
                   dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                }
            });

        angular.element('#div-loading').show();
        applicationService.getGeneralInfo($cookieStore.get('user').userToken)
            .then(function(result){
                for(var i in result){
                    if(result[i].instancia == "ENPROGRESO"){
                        processApplicCtrl.applicId = result[i].idPostulacion;
                        processApplicCtrl.firstName = result[i].nombres;
                        processApplicCtrl.lastName = result[i].apellidos;
                        processApplicCtrl.email = result[i].email;
                        processApplicCtrl.applicGralInfo = result[i];
                    }
                }
                processApplicCtrl.classProgress = $scope.$parent.progressBar(processApplicCtrl.applicGralInfo.avance);
                angular.element('#div-loading').hide();
                applicationService.getGeneralInfoComplete(processApplicCtrl.applicId, $scope.connectedUser.userToken)
                    .then(function(result){
                        angular.element('#div-loading').hide();
                        if(result.status != "EMPTY"){
                            processApplicCtrl.dataEmpty = false;
                            processApplicCtrl.firstName = result.nombre;
                            processApplicCtrl.lastName = result.apellido;
                            processApplicCtrl.email = result.email;
                            processApplicCtrl.postalAddress = result.direccionPostal;
                            processApplicCtrl.passport = result.docIdentificacion;
                            processApplicCtrl.birthday = result.fechaNacimiento.substring(0, 10);
                            if(result.genero == "M"){
                                processApplicCtrl.genderSelected = processApplicCtrl.genders[1];
                            } else {
                                processApplicCtrl.genderSelected = processApplicCtrl.genders[0];
                            }
                            for(var i in processApplicCtrl.countrys){
                                if(processApplicCtrl.countrys[i].id == result.paisNacimiento){
                                    processApplicCtrl.birthCountrySelected = processApplicCtrl.countrys[i];
                                }
                                if(processApplicCtrl.countrys[i].id == result.paisResidencia){
                                    processApplicCtrl.residenceCountrySelected = processApplicCtrl.countrys[i];
                                }
                            }
                            processApplicCtrl.mainPhone = result.telefonoPrincipal;
                            if(result.telefonoSecundario === "undefined" || result.telefonoSecundario === null || result.telefonoSecundario === "null"){
                                processApplicCtrl.secondPhone = '';
                                $scope.secondPhone = '';
                            } else {
                                processApplicCtrl.secondPhone = result.telefonoSecundario;
                                $scope.secondPhone = result.telefonoSecundario;
                            }
                            $scope.mainPhone = result.telefonoPrincipal;
                            processApplicCtrl.urlFile = result.urlFile;
                            processApplicCtrl.nameFile = result.nombreFile;
                            processApplicCtrl.processApplicBtn = 'processApplicBtnUpdate';
                        } else {
                            processApplicCtrl.dataEmpty = true;
                            processApplicCtrl.processApplicBtn = 'processApplicBtnSave';
                        }
                    }).catch(function(data){
                        angular.element('#div-loading').hide();
                        if(data.status !== "OFF"){
                            $translate('msgErrorTitle1').then(function (msg) {
                                dialogs.error(msg, "codError:" + data.codError + " status: " + data.status);
                            });
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

    processApplicCtrl.setGeneralInfo = function(){
        if(processApplicCtrl.dataEmpty == true && $scope.file.name == undefined){
            $translate('processApplicDialogMsg2').then(function (msg) {
                dialogs.error(msg);
            });
        } else {
            var fileName = '';
            var file = {};
            if($scope.file.name == undefined){
                fileName = null;
                file = null;
            } else {
                fileName = $scope.file.name;
                file = $scope.file;
            }
            var dataRequest = {
                idPostulacion : processApplicCtrl.applicId,
                nombre : $scope.pa.firstName,
                apellido : $scope.pa.lastName,
                identificacion : $scope.pa.passport,
                genero : $scope.pa.genderSelected.id,
                fechaNacimiento : $scope.pa.birthday,
                paisNacimiento : $scope.pa.birthCountrySelected.id,
                paisResidencia : $scope.pa.residenceCountrySelected.id,
                direccion : $scope.pa.postalAddress,
                telefonoPrincipal : $scope.mainPhone,
                nombreFile : fileName
            }
            if($translate.use() == "en_US"){
                dataRequest.fechaNacimiento = $scope.pa.birthday.substr(3,2) + "/" + $scope.pa.birthday.substr(0,2) + "/" + $scope.pa.birthday.substr(6,4);
            }
            if($scope.secondPhone === ''){
                dataRequest.telefonoSecundario = null;
            } else {
                dataRequest.telefonoSecundario = $scope.secondPhone;
            }
            angular.element('#div-loading').show();
            applicationService.setGeneralInfo(dataRequest, file, $scope.connectedUser.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $scope.$parent.applicPercent = processApplicCtrl.applicPercent = result.arg1;
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleInstructions, msg);
                        });
                        $location.path('section2-education');
                    } else {
                        dialogs.error(result.status);
                    }
                }).catch(function(data){
                    angular.element('#div-loading').hide();
                    if(data.status == "OFF"){
                        $translate('msgSessionExpired').then(function (msg) {
                            dialogs.error(msg);
                        });
                        $scope.$parent.logout(true);
                    } else {
                        $translate('msgErrorTitle2').then(function (msg) {
                            dialogs.error(msg, "codError:" + data.codError + " status: " + data.status);
                        });
                    }
                });
        }
    }

    processApplicCtrl.instructionsSec1 = function(){
        $translate('processApplicInstrucSec1Msg1').then(function (msg) {
            dialogs.notify($scope.titleInstructions, msg);
        });
    }

}]);



