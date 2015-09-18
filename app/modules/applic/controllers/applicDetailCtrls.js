'use strict';
/**
 * @ngdoc function
 * @name prometeoApp.controller:processApplicCtrl
 * @description
 * # processApplicCtrl
 * Controller of the prometeoApp
 */
myApplic.controller("applicDetailCtrl", ['catalogsService','applicationService','applicSection2Service','applicSection3Service','applicSection4Service','applicSection5Service','applicSection6Service','catalogsApplicService','$scope','PROPIEDADES','PROPERTIES_APPLIC','$modal','dialogs','$location','$cookieStore','$translate','$routeParams',
            function(catalogsService,applicationService,applicSection2Service,applicSection3Service,applicSection4Service,applicSection5Service,applicSection6Service,catalogsApplicService,$scope,PROPIEDADES,PROPERTIES_APPLIC,$modal,dialogs,$location,$cookieStore,$translate,$routeParams) {

    var applicDetailCtrl = this;
    applicDetailCtrl.applicId = $routeParams.applicId;
    applicDetailCtrl.abilitys = PROPERTIES_APPLIC.AbilitysLanguage;
    applicDetailCtrl.patentTypes = PROPERTIES_APPLIC.PatentTypes;
    applicDetailCtrl.levels = PROPERTIES_APPLIC.levels;
    applicDetailCtrl.projectRoles = PROPERTIES_APPLIC.projectRoles;
    applicDetailCtrl.participationsBook = PROPERTIES_APPLIC.participationsBook;
    applicDetailCtrl.typesRecognition = PROPERTIES_APPLIC.typesRecognition;
    applicDetailCtrl.previousContact = {};
    applicDetailCtrl.curriculumVitae = {};

    applicDetailCtrl.initCtrl = function(){
        angular.element('#div-loading').show();
        catalogsService.getCountrys($scope.connectedUser.userToken)
            .then(function(resultCountrys){
                applicDetailCtrl.countrys = resultCountrys;
            }).catch(function(data){

            });
        catalogsApplicService.getTitles($scope.connectedUser.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                applicDetailCtrl.titles = result;
            }).catch(function(data){

            });
        catalogsApplicService.getLanguages($scope.connectedUser.userToken)
            .then(function(result){
                applicDetailCtrl.langs = result;
            }).catch(function(data){

            });
        applicSection5Service.getInstitutions($scope.connectedUser.userToken)
            .then(function(result){
                applicDetailCtrl.institutions = result;
            }).catch(function(data){

            });

        applicationService.getGeneralInfo($scope.connectedUser.userToken)
            .then(function(result){
                for(var i in result){
                    if(result[i].instancia == "ENVIADO"){
                        applicDetailCtrl.applicGralInfo = result[i];
                    }
                }
            }).catch(function(data){

            });

        applicationService.getGeneralInfoComplete(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(resultInfoComplete){
                if(resultInfoComplete.status != "EMPTY"){
                    applicDetailCtrl.generalInfo = resultInfoComplete;
                    for(var i in applicDetailCtrl.countrys){
                        if(applicDetailCtrl.countrys[i].id == applicDetailCtrl.generalInfo.paisNacimiento){
                            applicDetailCtrl.generalInfo.paisNacimientoNombre = applicDetailCtrl.countrys[i].descripcion;
                        }
                        if(applicDetailCtrl.countrys[i].id == applicDetailCtrl.generalInfo.paisResidencia){
                            applicDetailCtrl.generalInfo.paisResidenciaNombre = applicDetailCtrl.countrys[i].descripcion;
                        }
                    }
                    if($translate.use() == "es_ES"){
                        applicDetailCtrl.generalInfo.fechaNacimiento = applicDetailCtrl.generalInfo.fechaNacimiento.substr(3,2) + '/' + applicDetailCtrl.generalInfo.fechaNacimiento.substr(0,2) + '/' + applicDetailCtrl.generalInfo.fechaNacimiento.substr(6,4);
                    }
                } else {
                    applicDetailCtrl.generalInfo = '';
                }
            }).catch(function(data){
                angular.element('#div-loading').hide();
                if(data.status !== "OFF"){
                    $translate('msgErrorTitle1').then(function (msg) {
                        dialogs.error(msg, "codError:" + data.codError + " status: " + data.status);
                    });
                }
            });
        applicSection2Service.getEducations(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.degrees = result;
                    for(var j in applicDetailCtrl.degrees){
                        for(var i in applicDetailCtrl.countrys){
                            if(applicDetailCtrl.countrys[i].id == applicDetailCtrl.degrees[j].pais){
                                applicDetailCtrl.degrees[j].paisNombre = applicDetailCtrl.countrys[i].descripcion;
                            }
                        }
                        if($translate.use() == "es_ES"){
                            applicDetailCtrl.degrees[j].fechaInicio = applicDetailCtrl.degrees[j].fechaInicio.substr(3,2) + '/' + applicDetailCtrl.degrees[j].fechaInicio.substr(0,2) + '/' + applicDetailCtrl.degrees[j].fechaInicio.substr(6,4);
                            applicDetailCtrl.degrees[j].fechaFin = applicDetailCtrl.degrees[j].fechaFin.substr(3,2) + '/' + applicDetailCtrl.degrees[j].fechaFin.substr(0,2) + '/' + applicDetailCtrl.degrees[j].fechaFin.substr(6,4);
                        }
                    }
                    for(var i in applicDetailCtrl.titles){
                        for(var j in applicDetailCtrl.degrees){
                            if(applicDetailCtrl.titles[i].id == applicDetailCtrl.degrees[j].tituloObtenido){
                                applicDetailCtrl.degrees[j].tituloObtenidoNombre = applicDetailCtrl.titles[i].descripcion;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.degrees = [];
                }

            }).catch(function(data){

            });
        applicSection2Service.getLanguages(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.languages = result;
                } else {
                    applicDetailCtrl.languages = [];
                }
            }).catch(function(data){

            });
        applicSection2Service.getPostdocs(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.postdocs = result;
                    if($translate.use() == "es_ES"){
                        for(var i in applicDetailCtrl.postdocs){
                            applicDetailCtrl.postdocs[i].fechaInicio = applicDetailCtrl.postdocs[i].fechaInicio.substr(3,2) + '/' + applicDetailCtrl.postdocs[i].fechaInicio.substr(0,2) + '/' + applicDetailCtrl.postdocs[i].fechaInicio.substr(6,4);
                            applicDetailCtrl.postdocs[i].fechaFin= applicDetailCtrl.postdocs[i].fechaFin.substr(3,2) + '/' + applicDetailCtrl.postdocs[i].fechaFin.substr(0,2) + '/' + applicDetailCtrl.postdocs[i].fechaFin.substr(6,4);
                        }
                    }
                } else {
                    applicDetailCtrl.postdocs = [];
                }

            }).catch(function(data){

            });
        applicSection3Service.getUnivTeachings(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].institucion != "EMPTY"){
                    applicDetailCtrl.univTeachings = result;
                } else {
                    applicDetailCtrl.univTeachings = [];
                }
            }).catch(function(data){

            });
        applicSection3Service.getPatents(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.patents = result;
                    for(var j in applicDetailCtrl.patents){
                        for(var i in applicDetailCtrl.patentTypes){
                            if(applicDetailCtrl.patentTypes[i].id == applicDetailCtrl.patents[j].tipo){
                                applicDetailCtrl.patents[j].tipoNombre = applicDetailCtrl.patentTypes[i].description;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.patents = [];
                }
            }).catch(function(data){

            });
        applicSection3Service.getConferences(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.conferences = result;
                    for(var j in applicDetailCtrl.conferences) {
                        for (var i in applicDetailCtrl.countrys) {
                            if (applicDetailCtrl.countrys[i].id == applicDetailCtrl.conferences[j].idPais) {
                                applicDetailCtrl.conferences[j].paisNombre = applicDetailCtrl.countrys[i].descripcion;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.conferences = [];
                }
            }).catch(function(data){

            });
        applicSection3Service.getDirectedThesis(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.directedThesis = result;
                    for(var j in applicDetailCtrl.directedThesis) {
                        for (var i in applicDetailCtrl.levels) {
                            if (applicDetailCtrl.levels[i].id == applicDetailCtrl.directedThesis[j].nivel) {
                                applicDetailCtrl.directedThesis[j].nivelNombre = applicDetailCtrl.levels[i].description;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.directedThesis = [];
                }
            }).catch(function(data){

            });
        applicSection4Service.getWorkExperiences(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.workExperiences = result;
                } else {
                    applicDetailCtrl.workExperiences = [];
                }
            }).catch(function(data){

            });
        applicSection4Service.getProjects(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.projects = result;
                    for(var i in applicDetailCtrl.projects){
                        for(var j in applicDetailCtrl.projectRoles){
                            if(applicDetailCtrl.projects[i].participacion == applicDetailCtrl.projectRoles[j].id){
                                applicDetailCtrl.projects[i].role = applicDetailCtrl.projectRoles[j].description;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.projects = [];
                }
            }).catch(function(data){

            });
        applicSection4Service.getAdvices(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.advices = result;
                } else {
                    applicDetailCtrl.advices = [];
                }
            }).catch(function(data){

            });
        applicSection4Service.getPublishedBooks(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.publishedBooks = result;
                    for(var i in applicDetailCtrl.publishedBooks){
                        for(var j in applicDetailCtrl.participationsBook){
                            if(applicDetailCtrl.publishedBooks[i].participacion == applicDetailCtrl.participationsBook[j].id){
                                applicDetailCtrl.publishedBooks[i].role = applicDetailCtrl.participationsBook[j].description;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.publishedBooks = [];
                }
            }).catch(function(data){

            });
        applicSection4Service.getExpCourses(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.expCourses = result;
                } else {
                    applicDetailCtrl.expCourses = [];
                }
            }).catch(function(data){

            });
        applicSection5Service.getAffiliations(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.affiliations = result;
                } else {
                    applicDetailCtrl.affiliations = [];
                }
            }).catch(function(data){

            });
        applicSection5Service.getScholarships(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                if(result[0].status != "EMPTY"){
                    applicDetailCtrl.scholarships = result;
                    for(var i in applicDetailCtrl.scholarships){
                        for(var j in applicDetailCtrl.typesRecognition){
                            if(applicDetailCtrl.scholarships[i].tipo == applicDetailCtrl.typesRecognition[j].id){
                                applicDetailCtrl.scholarships[i].typeRecog = applicDetailCtrl.typesRecognition[j].description;
                            }
                        }
                    }
                } else {
                    applicDetailCtrl.scholarships = [];
                }
            }).catch(function(data){

            });
        applicSection5Service.getPreviousContact(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function(result){
                angular.element('#div-loading').hide();
                if(result.status != "NONE"){
                    for(var i in applicDetailCtrl.institutions){
                        if(applicDetailCtrl.institutions[i].id == result.idInstitucion){
                            applicDetailCtrl.previousContact.institutionNombre = applicDetailCtrl.institutions[i].descripcion;
                        }
                    }
                    applicDetailCtrl.previousContact.acronym = result.siglas;
                    applicDetailCtrl.previousContact.contactName = result.nombre;
                    applicDetailCtrl.previousContact.contactEmail = result.email;
                } else {
                    applicDetailCtrl.previousContact.institutionNombre = null;
                    applicDetailCtrl.previousContact.acronym = null;
                    applicDetailCtrl.previousContact.contactName = null;
                    applicDetailCtrl.previousContact.contactEmail = null;
                }
            }).catch(function(data){

            });
        applicSection6Service.getCurriculumVitae(applicDetailCtrl.applicId, $scope.connectedUser.userToken)
            .then(function (result) {
                if (result.status != "NONE") {
                    applicDetailCtrl.curriculumVitae.nameFile = result.nombreFile;
                    applicDetailCtrl.curriculumVitae.urlFile = result.urlFile;
                }
            }).catch(function (data) {
                angular.element('#div-loading').hide();
                if (data.status != "OFF") {
                    dialogs.error("Error", "codError:" + data.codError + " status: " + data.status);
                }
            });
    }


}]);



