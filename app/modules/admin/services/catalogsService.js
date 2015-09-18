myAdmin.factory('catalogsService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN' , function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var catalogsService = {
        getInfoChannel : getInfoChannel,
        getCountrys : getCountrys,
        getInstitutions : getInstitutions
    };

    function getInfoChannel(){
        var deferred = $q.defer();
        var wsInfoChannel =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebServiceInfoChannel;

        $http.get(wsInfoChannel).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getCountrys(token){
        var deferred = $q.defer();
        var wsGetCountrys =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebGetCountrys +
                "/token/" + token;

        $http.get(wsGetCountrys).success(
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
            PROPERTIES_ADMIN.services.uriWebInstitutions +
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

    return catalogsService;
}]);
