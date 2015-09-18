'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:userLoginCtrl
 * @description
 * # userLoginCtrl
 * Controller of the prometeoApp
 */
myAdmin.controller("userLoginCtrl", ['userExistsService','userLoginService','applicationService','$scope','PROPIEDADES','$modal','dialogs','$location','$log','$cookieStore', '$translate', '$routeParams', '$interval', '$rootScope',
            function(userExistsService,userLoginService,applicationService,$scope,PROPIEDADES,$modal,dialogs,$location,$log,$cookieStore,$translate,$routeParams,$interval,$rootScope) {

    var userLoginCtrl = this;

    userLoginCtrl.login = function(){
      if ($scope.loginForm.$valid){
            angular.element('#div-loading').show();
            userLoginService.getUserLogin($scope.ul.userName,$scope.ul.userPassword)
            .then(function(dataUser){
                  if(dataUser.login == true) {
                      if (dataUser.activo == true) {
                          var user = {
                              userActive: dataUser.activo,
                              userLogin : dataUser.login,
                              userToken : dataUser.token,
                              userUsername : dataUser.username,
                              userRole : dataUser.rol,
                              userFirstName : dataUser.nombres,
                              userLastName : dataUser.apellidos,
                              userLanguage : dataUser.idioma,
                              isConnected : true,
                              urlStart : 'dashboard'};
                          $scope.connectedUser.userActive = user.userActive;
                          $scope.connectedUser.userLogin = user.userLogin;
                          $scope.connectedUser.userToken = user.userToken;
                          $scope.connectedUser.userUsername = user.userUsername;
                          $scope.connectedUser.userRole = user.userRole;
                          $scope.connectedUser.userFirstName = user.userFirstName;
                          $scope.connectedUser.userLastName = user.userLastName;
                          $scope.connectedUser.userLanguage = user.userLanguage;
                          $scope.connectedUser.isConnected = user.isConnected;
                          $scope.connectedUser.urlStart = user.urlStart;

                          userLoginCtrl.mainMenu = [
                              {href : '#/' + $scope.connectedUser.urlStart, clic : '', title : 'menuStart', activetab : 'start'},
                              {href : '#/status-application', clic : '', title : 'menuStatusApp', activetab : 'status-application'},
                              {href : '#/notifications', clic : '', title : 'menuNotifications', activetab : 'notifications'},
                              {href : '#/bases-application', clic : '', title : 'menuHelp', activetab : 'help'},
                              {href : '#/user-profile', clic : '', title : 'menuUserProfile', activetab : 'user-profile'}
                          ];

                          $cookieStore.put('user', user);
                          $cookieStore.put('mainMenu', userLoginCtrl.mainMenu);
                          $cookieStore.put('login', true);
                          $translate.use(user.userLanguage);
                          $scope.$emit('languageLoad', { language : user.userLanguage});
                          applicationService.getGeneralInfo($scope.connectedUser.userToken)
                              .then(function(result){
                                  angular.element('#div-loading').hide();
                                  $cookieStore.put('instanceApplic', result.instancia);
                                  $location.path('/dashboard');
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
                          $scope.$parent.initCtrl();
                      } else {
                          angular.element('#div-loading').hide();
                          $translate('userLoginMsgText1').then(function (msg) {
                              dialogs.error('Error', msg);
                          });
                      }
                  } else {
                      angular.element('#div-loading').hide();
                      if(dataUser.bloqueadoHasta != null){
                          $translate('userLoginMsgText3').then(function (msg) {
                              dialogs.error('Error', msg + dataUser.bloqueadoHasta.substr(10,9));
                          });
                      } else {
                          $translate('userLoginMsgText2').then(function (msg) {
                              dialogs.error('Error', msg);
                          });
                      }
                  }
            }).catch(function(data){
                    angular.element('#div-loading').hide();
                    if(data.status == null) {
                        dialogs.error('Error', "null");
                    } else {
                        dialogs.error('Error', data.status);
                    }
            });
      }
    }

    userLoginCtrl.confirm = function(){
        userLoginService.getUserActived($routeParams.username)
            .then(function(data){
              if (data.status != true){
                  userLoginService.getUserConfirm($routeParams.username,$routeParams.token)
                      .then(function(data){
                          if(data.status == "OK"){
                              userLoginCtrl.message = "userloginText6";
                              userLoginCtrl.messageClass = "info";
                          } else {
                              userLoginCtrl.message = "userloginText9";
                              userLoginCtrl.messageClass = "danger";
                          }
                      }).catch(function(data){
                          userLoginCtrl.message = "userloginText7";
                          userLoginCtrl.messageClass = "danger";
                      });
              } else {
                  userLoginCtrl.message = "userloginText8";
                  userLoginCtrl.messageClass = "info";
              }
            }).catch(function(data){
                userLoginCtrl.message = "userloginText7";
                userLoginCtrl.messageClass = "danger";
            });
    }

    userLoginCtrl.gotToLogin = function(){
        $location.path('/');
    }

}]);