/**
 * @ngdoc function
 * @name prometeoApp.services:
 *                                  applicSection5Service
 *
 * @description
 * # applicAffiliationService
 * Services of the prometeoApp
 */


myAdmin.factory('applicSection5Service', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicSection5Service = {
        setAffiliation : setAffiliation,
        getAffiliations : getAffiliations,
        deleteAffiliation : deleteAffiliation,
        setScholarship : setScholarship,
        getScholarships : getScholarships,
        deleteScholarship : deleteScholarship,
        getInstitutions : getInstitutions,
        setPreviousContact : setPreviousContact,
        getPreviousContact : getPreviousContact
    };

    function getAffiliations(applicId, token){
        var deferred = $q.defer();
        var wsGetAffiliations =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebAffiliation +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetAffiliations).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setAffiliation(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetAffiliation =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebAffiliation +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetAffiliation, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteAffiliation(id, token){
        var deferred = $q.defer();
        var wsDeleteAffiliation =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteAffiliation +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteAffiliation).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getScholarships(applicId, token){
        var deferred = $q.defer();
        var wsGetScholarships =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebScholarship +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetScholarships).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setScholarship(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetScholarship =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebScholarship +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetScholarship,
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

    function deleteScholarship(id, token){
        var deferred = $q.defer();
        var wsDeleteScholarship =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteScholarship +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteScholarship).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getInstitutions(token){
        var deferred = $q.defer();
        var wsGetInstitutions =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetInsitutions +
            "/token/" + token;

        $http.get(wsGetInstitutions).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setPreviousContact(dataRequest, token){
        var deferred = $q.defer();
        var wsSetPreviousContact =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPreviousContact +
            "/token/" + token;

        $http.post(wsSetPreviousContact, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function getPreviousContact(applicId, token){
        var deferred = $q.defer();
        var wsGetPreviousContact =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPreviousContact +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetPreviousContact).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicSection5Service;
}]);