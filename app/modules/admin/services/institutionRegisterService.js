myAdmin.factory('institutionExistsService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN', function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var institutionExistsService = {
        getInstitutionExists : getInstitutionExists
    };

    function getInstitutionExists(userName, email){
        var deferred = $q.defer();
        var wsInstitutionExists =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_ADMIN.services.uriWebServiceUserExists +
            "/username/" + userName + "/email/" + email + ".json";
        $http.get(wsInstitutionExists).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return institutionExistsService;
}]);

myAdmin.factory('institutionRegisterService', ['$http','$q','PROPIEDADES','PROPERTIES_ADMIN', function ($http, $q, PROPIEDADES, PROPERTIES_ADMIN) {

    var institutionRegisterService = {
        setInstitutionRegister : setInstitutionRegister
    };

    function setInstitutionRegister(institution){
        var deferred = $q.defer();
        var wsInstitutionRegister =  PROPIEDADES.propiedades.server + ":" +
                                PROPIEDADES.propiedades.port + "/" +
                                PROPERTIES_ADMIN.services.uriWebServiceUserRegister;
        var institutionData = {
                username : institution.userName,
                password : institution.pwd,
                email : institution.email,
                nombres : institution.nombres,
                apellidos : institution.apellidos,
                idioma : institution.idiomaSeleccionado,
                canalInformacion : institution.encuestaSeleccionada}

       $http.post(wsInstitutionRegister, institutionData)
             .success(function(data, status, headers, config) {
                 deferred.resolve(data);
             })
            .error(function (data, status, headers, config)	{
               deferred.reject(data);
            });
        return deferred.promise;
    }

    return institutionRegisterService;
}]);
