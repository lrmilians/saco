myApplic.factory('catalogsApplicService', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC) {

    var catalogsApplicService = {
        getAreasExpertise : getAreasExpertise,
        getTitles : getTitles,
        getLanguages : getLanguages
    };

    function getAreasExpertise(token){
        var deferred = $q.defer();
        var wsGetAreasExpertise =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetAreasExpertise +
            "/token/" + token;

        $http.get(wsGetAreasExpertise).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getTitles(token){
        var deferred = $q.defer();
        var wsGetTitles =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebGetTitles +
            "/token/" + token;

        $http.get(wsGetTitles).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getLanguages(token){
        var deferred = $q.defer();
        var wsGetLanguages =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebLanguage +
            "/token/" + token;

        $http.get(wsGetLanguages).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return catalogsApplicService;
}]);
