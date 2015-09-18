myAdmin.factory('userExistsService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN', function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var userExistsService = {
        getUserExists : getUserExists
    };

    function getUserExists(userName, email){
        var deferred = $q.defer();
        var wsUserExists =  PROPIEDADES.propiedades.server + ":" +
                            PROPIEDADES.propiedades.port + "/" +
                            PROPERTIES_ADMIN.services.uriWebServiceUserExists +
                            "/username/" + userName + "/email/" + email + ".json";
        $http.get(wsUserExists).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return userExistsService;
}]);

myAdmin.factory('userRegisterService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN', function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var userRegisterService = {
        setUserRegister : setUserRegister,
        getUserProfile : getUserProfile,
        setUserProfile : setUserProfile
    };

    function setUserRegister(user){
        var deferred = $q.defer();
        var wsUserRegister =  PROPIEDADES.propiedades.server + ":" +
                              PROPIEDADES.propiedades.port + "/" +
                              PROPERTIES_ADMIN.services.uriWebServiceUserRegister;
        var userData = {
                username : user.userName,
                password : user.pwd,
                email : user.email,
                nombres : user.nombres,
                apellidos : user.apellidos,
                idioma : user.idiomaSeleccionado,
                canalInformacion : user.encuestaSeleccionada}

       $http.post(wsUserRegister, userData)
             .success(function(data, status, headers, config) {
                 deferred.resolve(data);
             })
            .error(function (data, status, headers, config)	{
               deferred.reject(data);
            });
        return deferred.promise;
    }

    function getUserProfile(token){
        var deferred = $q.defer();
        var uriWebGetUserProfile =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebUserProfile +
            "/token/" + token;

        $http.get(uriWebGetUserProfile).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setUserProfile(dataRequest, token){
        var deferred = $q.defer();
        var uriWebSetUserProfile =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebUserProfile +
            "/token/" + token;

        $http.post(uriWebSetUserProfile, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return userRegisterService;
}]);
