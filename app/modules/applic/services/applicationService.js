myApplic.factory('applicationService', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicationService = {
        getValidationProfile : getValidationProfile,
        validationProfile : validationProfile,
        getGeneralInfo : getGeneralInfo,
        setGeneralInfo : setGeneralInfo,
        getGeneralInfoComplete : getGeneralInfoComplete,
        registerApplic : registerApplic,
        sendRecommendation : sendRecommendation
    };

    function getValidationProfile(applicType, token){
        var deferred = $q.defer();
        var wsGetValidationProfile =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetValidationProfile +
            "/tipopostulacion/" + applicType + "/token/" + token;

        $http.get(wsGetValidationProfile).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function validationProfile(dataRequest, token){
        var deferred = $q.defer();
        var wsValidationProfile =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebValidationProfile +
            "/token/" + token;

        $http.post(wsValidationProfile, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getGeneralInfo(token){
        var deferred = $q.defer();
        var wsGetGeneralInfo =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetGeneralInfo +
            "/token/" + token;

        $http.get(wsGetGeneralInfo).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setGeneralInfo(dataRequest, file, token){
        var deferred = $q.defer();
        var wsSetGeneralInfo =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebSetGeneralInfo +
            "/token/" + token;

        $upload.upload({
            url: wsSetGeneralInfo,
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

    function getGeneralInfoComplete(id,token){
        var deferred = $q.defer();
        var wsGetGeneralInfoComplete =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetGeneralInfoComplete +
            "/id/" + id + "/token/" + token;

        $http.get(wsGetGeneralInfoComplete).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function registerApplic(applicId, token){
        var deferred = $q.defer();
        var wsRegisterApplic =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebRegisterApplic +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsRegisterApplic).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function sendRecommendation(dataRequest, applicId, token){
        var deferred = $q.defer();
        var wsSendRecommendation =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebSendRecommendation +
            "/id/" + applicId + "/token/" + token;

        $http.post(wsSendRecommendation, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicationService;
}]);


myApplic.service("RouteArgs", function() {
    return {
        data: {}
    };
});