/**
 * @ngdoc function
 * @name prometeoApp.services:
 *                                  applicSection6Service
 *
 * @description
 * # applicSection6Service
 * Services of the prometeoApp
 */


myAdmin.factory('applicSection6Service', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicSection6Service = {
        getCurriculumVitae : getCurriculumVitae,
        setCurriculumVitae : setCurriculumVitae,
        getToComplete : getToComplete
    };

    function setCurriculumVitae(dataRequest, file, applicId, token){
        var deferred = $q.defer();
        var wsSetCurriculumVitae =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebCurriculumVitae +
            "/id/" + applicId + "/token/" + token;

        $upload.upload({
            url: wsSetCurriculumVitae,
            file: file,
            data: dataRequest
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getCurriculumVitae(applicId, token){
        var deferred = $q.defer();
        var wsGetCurriculumVitae =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebCurriculumVitae +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetCurriculumVitae).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getToComplete(applicId, token){
        var deferred = $q.defer();
        var wsGetToComplete =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebToComplete +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetToComplete).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicSection6Service;
}]);