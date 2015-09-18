myMain.factory('mainService', ['$http','$q','PROPIEDADES','PROPERTIES_MAIN', function ($http, $q, PROPIEDADES, PROPERTIES_MAIN) {

    var mainService = {
        userLogout : userLogout,
    };

    function userLogout(token){
        var deferred = $q.defer();
        var uriWebUserLogout =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_MAIN.services.uriWebServiceUserLogout +
            "/token/" + token;

        $http.get(uriWebUserLogout).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return mainService;
}]);
