myAdmin.factory('userLoginService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN', function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var userLoginService = {
        getUserLogin : getUserLogin,
        getUserConfirm : getUserConfirm,
        getUserActived : getUserActived
    };

    function getUserLogin(userName, userPassword){
        var deferred = $q.defer();
        var wsUserLogin =  PROPIEDADES.propiedades.server + ":" +
                            PROPIEDADES.propiedades.port + "/" +
                            PROPERTIES_ADMIN.services.uriWebServiceUserLogin +
                                '/username/' + userName + '/password/' + userPassword;

        $http.get(wsUserLogin).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getUserConfirm(userName, token){
        var deferred = $q.defer();
        var wsUserConfirm =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebServiceUserConfirm +
            "/username/" + userName + "/serie/" + token;

        $http.get(wsUserConfirm).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getUserActived(userName, token){
        var deferred = $q.defer();
        var wsUserActived =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebServiceUserActived +
            '/username/' + userName;

        $http.get(wsUserActived).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return userLoginService;
}]);
