/**
 * @ngdoc function
 * @name prometeoApp.services:
 *                                  applicWorkExperienceService,
 *                                  applicProjectService,
 *                                  applicAdviceService,
 *
 * @description
 * # applicWorkExperienceService,
 * # applicProjectService
 * # applicAdviceService
 * Services of the prometeoApp
 */

myAdmin.factory('applicSection4Service', ['$http','$q','PROPIEDADES','PROPERTIES_APPLIC','$upload', function ($http, $q, PROPIEDADES, PROPERTIES_APPLIC, $upload) {

    var applicSection4Service = {
        setWorkExperience : setWorkExperience,
        getWorkExperiences : getWorkExperiences,
        deleteWorkExperience : deleteWorkExperience,
        setProject : setProject,
        getProjects : getProjects,
        deleteProject : deleteProject,
        setAdvice : setAdvice,
        getAdvices : getAdvices,
        deleteAdvice : deleteAdvice,
        setPublishedBook : setPublishedBook,
        getPublishedBooks : getPublishedBooks,
        deletePublishedBook : deletePublishedBook,
        setPublication : setPublication,
        getExpCourses : getExpCourses,
        setExpCourse : setExpCourse,
        deleteExpCourse : deleteExpCourse
    };

    function getWorkExperiences(applicId, token){
        var deferred = $q.defer();
        var wsGetWorkExperiences =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebWorkExperience +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetWorkExperiences).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function setWorkExperience(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetWorkExperience =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebWorkExperience +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetWorkExperience,
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

    function deleteWorkExperience(id, token){
        var deferred = $q.defer();
        var wsDeleteWorkExperience =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteWorkExperience +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteWorkExperience).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getProjects(applicId, token){
        var deferred = $q.defer();
        var wsGetProjects =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebProject +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetProjects).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setProject(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetProject =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebProject +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetProject, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteProject(id, token){
        var deferred = $q.defer();
        var wsDeleteProject =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteProject +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteProject).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getAdvices(applicId, token){
        var deferred = $q.defer();
        var wsGetAdvices =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebAdvice +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetAdvices).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setAdvice(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetAdvice =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebAdvice +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetAdvice, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deleteAdvice(id, token){
        var deferred = $q.defer();
        var wsDeleteAdvice =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteAdvice +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteAdvice).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getPublishedBooks(applicId, token){
        var deferred = $q.defer();
        var wsGetPublishedBooks =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPublishedBook +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetPublishedBooks).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setPublishedBook(dataRequest, action, token){
        var deferred = $q.defer();
        var wsSetPublishedBook =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPublishedBook +
            "/id/" + action + "/token/" + token;

        $http.post(wsSetPublishedBook, dataRequest)
            .success(function(data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function deletePublishedBook(id, token){
        var deferred = $q.defer();
        var wsDeletePublishedBook =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeletePublishedBook +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeletePublishedBook).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function setPublication(dataRequest, token){
        var deferred = $q.defer();
        var wsSetPublication =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebPublication +
            "/id/" + dataRequest.applicId + "/publicacion/numero/" + dataRequest.numPub + "/token/" + token;

        $http.get(wsSetPublication).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }


    function getExpCourses(applicId, token){
        var deferred = $q.defer();
        var wsGetExpCourses =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebExpCourse +
            "/id/" + applicId + "/token/" + token;

        $http.get(wsGetExpCourses).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function setExpCourse(dataRequest, file, action, token){
        var deferred = $q.defer();
        var wsSetExpCourse =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebExpCourse +
            "/id/" + action + "/token/" + token;

        $upload.upload({
            url: wsSetExpCourse,
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

    function deleteExpCourse(id, token){
        var deferred = $q.defer();
        var wsDeleteExpCourse =  PROPIEDADES.propiedades.server + ":" +
            PROPIEDADES.propiedades.port + "/" +
            PROPERTIES_APPLIC.services.uriWebDeleteExpCourse +
            "/id/" + id + "/token/" + token;

        $http.get(wsDeleteExpCourse).success(
            function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config)	{
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return applicSection4Service;
}]);