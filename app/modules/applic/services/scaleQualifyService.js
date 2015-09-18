myAdmin.factory('scaleService', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC) {

    var scaleService = {
        getScales : getScales,
        getScaleById : getScaleById
    };

    function getScales(applicType, token){
        var deferred = $q.defer();
        var wsGetScales =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetScales +
            "/tp/" + applicType + "/token/" + token;

        $http.get(wsGetScales).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getScaleById(scaleId, token){
        var deferred = $q.defer();
        var wsGetScaleById =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetScale +
            "/id/" + scaleId + "/token/" + token;

        $http.get(wsGetScaleById).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return scaleService;
}]);

myAdmin.factory('qualifyService', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var qualifyService = {
        startQualify : startQualify,
        qualify : qualify,
        qualifyCriteria : qualifyCriteria,
        sendQualify : sendQualify,
        getQualifyHistory : getQualifyHistory
    };

    function startQualify(dataRequest, token){
        var deferred = $q.defer();
        var wsStartQualify =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebStartQualify +
            "/token/" + token;

        $http.post(wsStartQualify, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function qualify(dataRequest, token){
        var deferred = $q.defer();
        var wsQualify =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebQualify +
            "/token/" + token;

        $http.post(wsQualify, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function qualifyCriteria(scaleCode, criteriaId, valueQ, token){
        var deferred = $q.defer();
        var wsQualifyCriteria =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebQualify +
            "/baremo/" + scaleCode + "/criterio/" + criteriaId + "/valor/" + valueQ + "/token/" + token;

        $http.get(wsQualifyCriteria).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function sendQualify(dataRequest, token){
        var deferred = $q.defer();
        var wsSendQualify =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebSendQualify +
            "/token/" + token;

        $http.post(wsSendQualify, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }




    function getQualifyHistory(token){
        var deferred = $q.defer();
        var wsGetQualifyHistory =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebQualifys +
            "/token/" + token;

        $http.get(wsGetQualifyHistory).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }



    return qualifyService;
}]);

myAdmin.factory('validationService', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var validationService = {

    };





    return validationService;
}]);
