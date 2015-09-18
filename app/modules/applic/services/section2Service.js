myAdmin.factory('applicSection2Service', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicSection2Service = {
        getEducations : getEducations,
        setEducation : setEducation,
        deleteEducation : deleteEducation,
        getLanguages : getLanguages,
        setLanguage : setLanguage,
        deleteLanguage : deleteLanguage,
        getPostdocs : getPostdocs,
        setPostdoc : setPostdoc,
        deletePostdoc : deletePostdoc
    };

    function getEducations(applicId, token){
        var deferred = $q.defer();
        var wsGetEducations =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebEducation +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetEducations).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function setEducation(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetEducation =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebEducation +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetEducation,
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

    function deleteEducation(id, token){
        var deferred = $q.defer();
        var wsGetDeleteEducations =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteEducation +
            "/id/" + id + "/token/" + token;

        $http.get(wsGetDeleteEducations).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getLanguages(applicId,token){
        var deferred = $q.defer();
        var wsGetLanguages =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebLanguage +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetLanguages).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function setLanguage(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetLanguage =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebLanguage+
            "/id/" + action + "/token/" + token;

        $http.post(wsSetLanguage, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteLanguage(id, token){
        var deferred = $q.defer();
        var wsDeleteEducation =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteLanguage +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteEducation).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }


    function getPostdocs(applicId,token){
        var deferred = $q.defer();
        var wsGetPostdocs =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPostdoc +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetPostdocs).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setPostdoc(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetPostdoc =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPostdoc +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetPostdoc,
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

    function deletePostdoc(id, token){
        var deferred = $q.defer();
        var wsDeletePostdoc =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeletePostdoc +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeletePostdoc).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicSection2Service;
}]);