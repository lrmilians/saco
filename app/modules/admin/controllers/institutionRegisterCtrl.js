'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:institutionRegisterCtrl
 * @description
 * # institutionRegisterCtrl
 * Controller of the prometeoApp
 */
myAdmin.controller("institutionRegisterCtrl", ['institutionExistsService','catalogsService','institutionRegisterService','$scope','PROPIEDADES','$modal','dialogs','$location', '$translate',
        function(institutionExistsService,catalogsService,institutionRegisterService,$scope,PROPIEDADES,$modal,dialogs,$location,$translate) {

    var institutionRegisterCtrl = this;

    institutionRegisterCtrl.idiomas = PROPIEDADES.propiedades.Idiomas;
    institutionRegisterCtrl.idiomaSeleccionado = PROPIEDADES.propiedades.Idiomas[0];

    institutionRegisterCtrl.institutions = [
        {"id" : 1, "decription" : "Institution name1"},
        {"id" : 2, "decription" : "Institution name2"}
    ];
    institutionRegisterCtrl.institutionSelected = institutionRegisterCtrl.institutions[0];

    institutionRegisterCtrl.patternAcronymsName = /^[a-z0-9_-]{3,15}$/;

    /*catalogsService.getInstitutions()
        .then(function(result){
            institutionRegisterCtrl.institutions = result;
            institutionRegisterCtrl.institutionsSelected = institutionRegisterCtrl.institutions[0];
        }).catch(function(data){
            dialogs.error(data.error);
        });*/
console.log(institutionRegisterCtrl.institutionSelected);
            console.log(institutionRegisterCtrl.institutions);

    $scope.patternUserName = /^[a-z0-9_-]{6,15}$/;
    $scope.patternFirstName = $scope.patternLastName = /^[a-zA-Z\s]*$/;


    institutionRegisterCtrl.register = function(){
      if ($scope.userForm.$valid){
            userExistsService.getUserExists($scope.irc.userName,$scope.irc.email)
                .then(function(result){
                      if ((result.email != true) || (result.username != true)) {
                          var message = 'usuario';
                          var prefix = '';
                          if (result.email != true) {
                              var message = 'correo electronico';
                              if (result.username != true) {
                                  message = message + ' y el usuario ';
                                  prefix = 'n';
                              }
                          }
                          if (result.username != true) {
                              var message = 'usuario';
                              if (result.email !=true) {
                                  message = message + ' y el correo electronico ';
                                  prefix = 'n';
                              }
                          }
                          dialogs.notify('Aviso.','El ' + message + ' esta' + prefix + ' en uso.');
                      } else {
                          institutionRegisterService.setInstitutionRegister($scope.irc)
                              .then(function(result) {
                                if (result.status == "OK") {
                                    dialogs.notify('Aviso.','Registro realizado con éxito.');
                                    $location.path("/");
                                } else {
                                    dialogs.error('Registro no se realizo.');
                                }
                              }).catch(function(data){
                                  dialogs.error(data.error);
                              });
                      }
                }).catch(function(data){
                  dialogs.error(data.error);
                });

      }
    }


}]);