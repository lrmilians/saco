myAdmin.factory('applicSection3Service', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicSection3Service = {
        setUnivTeaching : setUnivTeaching,
        getUnivTeachings : getUnivTeachings,
        deleteUnivTeaching : deleteUnivTeaching,
        getPatents : getPatents,
        setPatent : setPatent,
        deletePatent : deletePatent,
        getConferences : getConferences,
        setConference : setConference,
        deleteConference : deleteConference,
        getDirectedThesis : getDirectedThesis,
        setDirectedThesis : setDirectedThesis,
        deleteDirectedThesis : deleteDirectedThesis
    };

    function getUnivTeachings(applicId, token){
        var deferred = $q.defer();
        var wsGetUnivTeachings =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebUnivTeaching +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetUnivTeachings).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function setUnivTeaching(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetUnivTeaching =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebUnivTeaching +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetUnivTeaching, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteUnivTeaching(id, token){
        var deferred = $q.defer();
        var wsDeleteUnivTeaching =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteUnivTeaching +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteUnivTeaching).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }


    function getPatents(applicId, token){
        var deferred = $q.defer();
        var wsGetPatents =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPatent +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetPatents).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function setPatent(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetPatent =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPatent +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetPatent, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deletePatent(id, token){
        var deferred = $q.defer();
        var wsDeletePatent =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeletePatent +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeletePatent).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getConferences(applicId, token){
        var deferred = $q.defer();
        var wsGetConferences =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebConference +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetConferences).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setConference(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetConference =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebConference +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetConference,
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

    function deleteConference(id, token){
        var deferred = $q.defer();
        var wsDeleteConference =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteConference +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteConference).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getDirectedThesis(applicId, token){
        var deferred = $q.defer();
        var wsGetDirectedThesis =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDirectedThesis +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetDirectedThesis).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setDirectedThesis(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetDirectedThesis =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDirectedThesis +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetDirectedThesis, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteDirectedThesis(id, token){
        var deferred = $q.defer();
        var wsDeleteDirectedThesis =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteDirectedThesis +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteDirectedThesis).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicSection3Service;
}]);
