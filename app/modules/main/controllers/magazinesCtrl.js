'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:magazinesCtrl
 * @description
 * # magazinesCtrl
 * Controller of the main
 */
myMain.controller("magazinesCtrl", ['$scope', '$cookieStore', '$location','$log','$translate',
            function ($scope, $cookieStore, $location, $log, $translate) {

    var magazinesCtrl = this;

    $scope.magazines = [ { "id" : 0 , "fileName" : "files/2014-marzo-abril-boletin.pdf", "title" : "Boletin Marzo-Abril 2014"} ,
                         { "id" : 1 , "fileName" : "files/INFORME-941-JUEVES-16-DE-JULIO-2015-09H00.pdf", "title" : "INFORME-941-JUEVES-16-DE-JULIO-2015-09H00" }];

    $scope.magazineFileNameActive = $scope.magazines[0].fileName;
    $scope.magazineTitleActive = $scope.magazines[0].title;

    $scope.loadMagazine = function(fileName, title){
        $scope.magazineFileNameActive = fileName;
        $scope.magazineTitleActive = title;
    }


}]);
