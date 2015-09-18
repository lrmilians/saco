'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:userRegisterCtrl
 * @description
 * # userRegisterCtrl
 * Controller of the prometeoApp
 */
myAdmin.controller("userRegisterCtrl", ['PROPIEDADES','PROPERTIES_ADMIN','PROPERTIES_APPLIC','userExistsService','catalogsService','userRegisterService','$scope','$modal','dialogs','$location', '$cookieStore', '$translate',
        function(PROPIEDADES,PROPERTIES_ADMIN,PROPERTIES_APPLIC,userExistsService,catalogsService,userRegisterService,$scope,$modal,dialogs,$location,$cookieStore,$translate) {

    var userRegisterCtrl = this;

    $scope.encuentaDescripcion = 'descripcion';

    userRegisterCtrl.pwd = '';
    userRegisterCtrl.pwd2 = '';
    userRegisterCtrl.dontMatch

    userRegisterCtrl.idiomas = PROPIEDADES.propiedades.Idiomas;

    $translate('processApplicDialogTitle1').then(function (title) {
        userRegisterCtrl.title = title;
    });
    $translate('userRegisterDialogMsg1').then(function (msg) {
        userRegisterCtrl.msg1 = msg;
    });
    $translate('userRegisterDialogMsg2').then(function (msg) {
        userRegisterCtrl.msg2 = msg;
    });
    $translate('userRegisterDialogMsg3').then(function (msg) {
        userRegisterCtrl.msg3 = msg;
    });
    $translate('userRegisterDialogMsg4').then(function (msg) {
        userRegisterCtrl.msg4 = msg;
    });

    userRegisterCtrl.initCtrl = function(login){
        angular.element('#div-loading').show();
        catalogsService.getInfoChannel()
            .then(function(result){
                angular.element('#div-loading').hide();
                userRegisterCtrl.encuesta = result;
            }).catch(function(data){
                angular.element('#div-loading').hide();
                dialogs.error('Error', data.error);
            });
        if(login){
            angular.element('#div-loading').show();
            userRegisterCtrl.userToken = $cookieStore.get('user').userToken;
            userRegisterService.getUserProfile(userRegisterCtrl.userToken)
                .then(function(result){
                    userRegisterCtrl.userName = result.username;
                    userRegisterCtrl.email = result.email;
                    userRegisterCtrl.firstName = result.nombres;
                    userRegisterCtrl.lastName = result.apellidos;
                    for(var i in userRegisterCtrl.idiomas){
                        if(userRegisterCtrl.idiomas[i].sufijo == result.idioma){
                            userRegisterCtrl.selectedLanguage = userRegisterCtrl.idiomas[i];
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
        }
    }


    userRegisterCtrl.checkPassword = function () {
      userRegisterCtrl.dontMatch = userRegisterCtrl.pwd !== userRegisterCtrl.pwd2;
    };
    $scope.patternUserName = PROPERTIES_ADMIN.regularExpression.userName;
    $scope.patternFirstName = $scope.patternLastName = PROPERTIES_APPLIC.regularExpression.name;

    userRegisterCtrl.canales= [
        { id: 1, label: 'catIndividually' },
        { id: 2, label: 'catInstitutional' },
        { id: 3, label: 'catCall' }
    ];
    userRegisterCtrl.convocatorias = [
        { id: 1, label: 'Convocatoria1' },
        { id: 2, label: 'Convocatoria2' },
        { id: 3, label: 'Convocatoria3' }
    ];

    userRegisterCtrl.register = function(){
      if ($scope.userForm.$valid){
            angular.element('#div-loading').show();
            userExistsService.getUserExists($scope.urc.userName,$scope.urc.email)
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
                          angular.element('#div-loading').hide();
                          dialogs.notify(userRegisterCtrl.title,'El ' + message + ' esta' + prefix + ' en uso.');
                      } else {
                          userRegisterService.setUserRegister($scope.urc)
                              .then(function(result) {
                                if (result.status == "OK") {
                                    angular.element('#div-loading').hide();
                                    dialogs.notify('Aviso.','Registro realizado con éxito.');
                                    $location.path("/");
                                } else {
                                    angular.element('#div-loading').hide();
                                    dialogs.error('Registro no se realizo.');
                                }
                              }).catch(function(data){
                                  angular.element('#div-loading').hide();
                                  dialogs.error(data.error);
                              });
                      }
                }).catch(function(data){
                    angular.element('#div-loading').hide();
                    dialogs.error(data.error);
                });

      }
    }

    userRegisterCtrl.setUserProfile = function() {
        if ($scope.userProfileForm.$valid) {
            var dataRequest = {
                nombres : userRegisterCtrl.firstName,
                apellidos : userRegisterCtrl.lastName,
                sufijo : userRegisterCtrl.selectedLanguage.sufijo,
                pwd1 : null,
                pwd2 : null
            }
            userRegisterService.setUserProfile(dataRequest, userRegisterCtrl.userToken)
                .then(function(result){
                    if(result.status == "OK"){
                        var userCookie = $cookieStore.get('user');
                        userCookie.userFirstName = userRegisterCtrl.firstName;
                        userCookie.userLastName = userRegisterCtrl.lastName;
                        userCookie.userLanguage = userRegisterCtrl.selectedLanguage.sufijo;
                        $cookieStore.remove('user');
                        $cookieStore.put('user',userCookie);
                        $translate.use(userRegisterCtrl.selectedLanguage.sufijo);
                        $translate('processApplicDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleNotice, msg);
                        });
                        $scope.$parent.initCtrl();
                        userRegisterCtrl.initCtrl(true);
                    } else {
                        dialogs.error('Error', result.status);
                    }
                }).catch(function(data){
                    angular.element('#div-loading').hide();
                    dialogs.error(data.error);
                });
        }
    }

    userRegisterCtrl.changePassword = function(){
        var dlg = dialogs.create('modules/admin/views/dialog-form/form-change-password.html','changePasswordDialogCtrl',{
            userToken : $scope.connectedUser.userToken,
            userData : {firstName : userRegisterCtrl.firstName, lastName : userRegisterCtrl.lastName, language : userRegisterCtrl.selectedLanguage.sufijo}
            },'lg');
        dlg.result.then(function(result){
            if(result.status == "OK"){
                $scope.$parent.logout(true);
            }
        },function(){
            if(angular.equals($scope.name,''))
                $scope.name = 'You did not enter in your name!';
        });
    }

    userRegisterCtrl.recoverPassword = function(){
        if ($scope.recoverPassForm.$valid){
            console.log(userRegisterCtrl.emailRecoverPass);
        }
    }

}]);

myAdmin.controller("changePasswordDialogCtrl",function(PROPERTIES_ADMIN,userRegisterService,$scope,$modalInstance,data,$translate,dialogs){

    $scope.cancel = function(){
        $modalInstance.dismiss('Canceled');
    };

    $scope.checkPassword = function () {
        $scope.dontMatch = $scope.newPassword1 !== $scope.newPassword2;
    };

    $scope.submitForm = function(){
        if ($scope.changePasswordForm.$valid && $scope.newPassword1 === $scope.newPassword2){
            var dataRequest = {
                nombres : data.userData.firstName,
                apellidos : data.userData.lastName,
                sufijo : data.userData.language,
                pwd1 : $scope.currentPassword,
                pwd2 : $scope.newPassword1
            }
            angular.element('#div-loading').show();
            userRegisterService.setUserProfile(dataRequest, data.userToken)
                .then(function(result){
                    angular.element('#div-loading').hide();
                    if(result.status == "OK"){
                        $translate('userregDialogMsg1').then(function (msg) {
                            dialogs.notify($scope.titleNotice, msg);
                        });
                        $modalInstance.close(result);
                    } else {
                        if(result.status == "Password anterior no es correcto"){
                            $translate('userregDialogMsg2').then(function (msg) {
                                dialogs.error('Error', msg);
                            });
                        } else {
                            dialogs.error('Error', result.status);
                        }
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


