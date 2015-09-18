'use strict';

var myApplic = angular.module('applic',['ngRoute']);

myApplic.config(function ($routeProvider) {
    $routeProvider
        .when('/acceptance-application-conditions/:applicType', {
            templateUrl: 'modules/applic/views/acceptance-application-conditions.html',
            controller: 'startApplicCtrl',
            activetab: 'start'
        })
        .when('/section1-general-information', {
            templateUrl: 'modules/applic/views/section1-general-information.html',
            controller: 'processApplicCtrl',
            activetab: 'start'
        })
        .when('/section2-education', {
            templateUrl: 'modules/applic/views/section2-education.html',
            controller: 'processApplicSection2Ctrl',
            activetab: 'start'
        })
        .when('/section3-university-teaching', {
            templateUrl: 'modules/applic/views/section3-university-teaching.html',
            controller: 'processApplicSection3Ctrl',
            activetab: 'start'
        })
        .when('/section4-work-experience', {
            templateUrl: 'modules/applic/views/section4-work-experience.html',
            controller: 'processApplicSection4Ctrl',
            activetab: 'start'
        })
        .when('/section5-affiliation', {
            templateUrl: 'modules/applic/views/section5-affiliation.html',
            controller: 'processApplicSection5Ctrl',
            activetab: 'start'
        })
        .when('/section6-file', {
            templateUrl: 'modules/applic/views/section6-file.html',
            controller: 'processApplicSection6Ctrl',
            activetab: 'start'
        })
        .when('/section7-to-complete', {
            templateUrl: 'modules/applic/views/section7-to-complete.html',
            controller: 'processApplicSection6Ctrl',
            activetab: 'start'
        })
        .when('/recommend-candidate', {
            templateUrl: 'modules/applic/views/recommend-candidate.html',
            controller: 'processApplicRecomCandidateCtrl',
            activetab: 'start'
        })
        .when('/application-detail/:applicId', {
            templateUrl: 'modules/applic/views/application-detail.html',
            controller: 'applicDetailCtrl',
            activetab: 'start'
        })
        .when('/select-scale', {
            templateUrl: 'modules/applic/views/select-scale.html',
            controller: 'scaleCtrl',
            activetab: 'start'
        })
        .when('/application-qualify', {
            templateUrl: 'modules/applic/views/application-qualify.html',
            controller: 'qualifyCtrl',
            activetab: 'start'
        })
        .when('/describe-validation', {
            templateUrl: 'modules/applic/views/describe-validation.html',
            controller: 'validationCtrl',
            activetab: 'start'
        })

        .otherwise({reditrectTo: "/"});
});


myApplic.constant('PROPERTIES_APPLIC', {
    "AbilitysLanguage" : [
        { "id" : 0 , "descripcion" : "catLangAbility0" },
        { "id" : 1 , "descripcion" : "catLangAbility1" },
        { "id" : 2 , "descripcion" : "catLangAbility2" },
        { "id" : 3 , "descripcion" : "catLangAbility3" },
    ],
    "PatentTypes" : [
        { "id" : "I" , "description" : "catPatentType0" },
        { "id" : "C" , "description" : "catPatentType1" },
    ],
    "projectRoles" : [
        { "id" : "P", "description" : "catProjectRoles0"},
        { "id" : "A", "description" : "catProjectRoles1"}
    ],
    "participationsBook" : [
        { "id" : "A", "description" : "catparticipationsBook0"},
        { "id" : "C", "description" : "catparticipationsBook1"},
        { "id" : "E", "description" : "catparticipationsBook2"},
        { "id" : "O", "description" : "catparticipationsBook3"}
    ],
    "typesRecognition" : [
        { "id" : "B", "description" : "catTypesRecognition0"},
        { "id" : "O", "description" : "catTypesRecognition1"},
        { "id" : "P", "description" : "catTypesRecognition2"},
        { "id" : "R", "description" : "catTypesRecognition3"}
    ],
    "levels" : [
        { "id" : "M", "description" : "catLevels0"},
        { "id" : "E", "description" : "catLevels1"},
        { "id" : "D", "description" : "catLevels2"},
        { "id" : "O", "description" : "catLevels3"}
    ],
    "toCompletes" : [
        { "id" : 1, "description" : "processApplicSec1Text1", "url" : "section1-general-information"},
        { "id" : 2, "description" : "processApplicSec2Text1", "url" : "section2-education"},
        { "id" : 3, "description" : "processApplicSec2Text2", "url" : "section2-education"},
        { "id" : 4, "description" : "processApplicSec2Text3", "url" : "section2-education"},
        { "id" : 5, "description" : "processApplicSec3Text1", "url" : "section3-university-teaching"},
        { "id" : 6, "description" : "processApplicSec3Text2", "url" : "section3-university-teaching"},
        { "id" : 7, "description" : "processApplicSec3Text3", "url" : "section3-university-teaching"},
        { "id" : 8, "description" : "processApplicSec3Text4", "url" : "section3-university-teaching"},
        { "id" : 9, "description" : "processApplicSec4Text1", "url" : "section4-work-experience"},
        { "id" : 10, "description" : "processApplicSec4Text2", "url" : "section4-work-experience"},
        { "id" : 11, "description" : "processApplicSec4Text3", "url" : "section4-work-experience"},
        { "id" : 12, "description" : "processApplicSec4Text4", "url" : "section4-work-experience"},
        { "id" : 13, "description" : "processApplicSec4Text6", "url" : "section4-work-experience"},
        { "id" : 14, "description" : "processApplicSec4Text5", "url" : "section4-work-experience"},
        { "id" : 15, "description" : "processApplicSec5Text1", "url" : "section5-affiliation"},
        { "id" : 16, "description" : "processApplicSec5Text2", "url" : "section5-affiliation"},
        { "id" : 17, "description" : "processApplicSec5Text3", "url" : "section5-affiliation"},
        { "id" : 18, "description" : "processApplicSec6Text1", "url" : "section6-file"}
    ],
    "regularExpression" : {
        "passport" : /^[a-zA-Z0-9_-]{4,15}$/,
        "phone" : /^[0-9_-]{6,15}$/,
        "name" : /^[a-zA-Z0-9\á\é\í\ó\ú\Á\É\Í\Ó\Ú\é\í\ó\ú\ñ\Ñ\â\ê\î\ô\û\.\_\-\s]{3,60}$/,
        "entity" : /^[a-zA-Z0-9\á\é\í\ó\ú\Á\É\Í\Ó\Ú\ñ\Ñ\â\ê\î\ô\û\.\-\_\,\;\s]{5,80}$/,
        "description" : /^[a-zA-Z0-9\á\é\í\ó\ú\Á\É\Í\Ó\Ú\ñ\Ñ\â\ê\î\ô\û\-\_\,\;\.\s]{10,500}$/,
        "number2Digits" : /^[0-9]{1,2}$/,
        "number3Digits" : /^[0-9]{1,3}$/,
        "acronym" : /^[a-zA-Z0-9_-]{3,25}$/,
        "university" : /^[a-zA-Z0-9\á\é\í\ó\ú\Á\É\Í\Ó\Ú\ñ\Ñ\â\ê\î\ô\û\-\_\,\;\.\s]{2,60}$/,
    },
    "services" : {
        "uriWebStartApplication" : "PROMETEOWEB/ws/pl/postulacion/iniciarpostulacion",
        "uriWebGetValidationProfile" : "PROMETEOWEB/ws/pl/postulacion/condiciones",
        "uriWebValidationProfile" : "PROMETEOWEB/ws/pl/postulacion/condiciones/evaluar",
        "uriWebGetGeneralInfo" : "PROMETEOWEB/ws/pl/postulacion",
        "uriWebGetGeneralInfoComplete" : "PROMETEOWEB/ws/pl/postulacion/info/general",
        "uriWebSetGeneralInfo" : "PROMETEOWEB/ws/pl/postulacion/info/general",
        "uriWebGetAreasExpertise" : "PROMETEOWEB/ws/pl/postulacion/educacion/espe",
        "uriWebEducation" : "PROMETEOWEB/ws/pl/postulacion/educacion",
        "uriWebDeleteEducation" : "PROMETEOWEB/ws/pl/postulacion/educacion/delete",
        "uriWebGetTitles" : "PROMETEOWEB/ws/pl/postulacion/educacion/titulo",
        "uriWebLanguage" : "PROMETEOWEB/ws/pl/postulacion/lenguaje",
        "uriWebDeleteLanguage" : "PROMETEOWEB/ws/pl/postulacion/lenguaje/delete",
        "uriWebUnivTeaching" : "PROMETEOWEB/ws/pl/postulacion/docencia",
        "uriWebDeleteUnivTeaching" : "PROMETEOWEB/ws/pl/postulacion/docencia/delete",
        "uriWebPatent" : "PROMETEOWEB/ws/pl/postulacion/patente",
        "uriWebDeletePatent" : "PROMETEOWEB/ws/pl/postulacion/patente/delete",
        "uriWebConference" : "PROMETEOWEB/ws/pl/postulacion/conferencia",
        "uriWebDeleteConference" : "PROMETEOWEB/ws/pl/postulacion/conferencia/delete",
        "uriWebWorkExperience" : "PROMETEOWEB/ws/pl/postulacion/experiencia",
        "uriWebDeleteWorkExperience" : "PROMETEOWEB/ws/pl/postulacion/experiencia/delete",
        "uriWebProject" : "PROMETEOWEB/ws/pl/postulacion/proyecto",
        "uriWebDeleteProject" : "PROMETEOWEB/ws/pl/postulacion/proyecto/delete",
        "uriWebAdvice" : "PROMETEOWEB/ws/pl/postulacion/asesoria",
        "uriWebDeleteAdvice" : "PROMETEOWEB/ws/pl/postulacion/asesoria/delete",
        "uriWebPublishedBook" : "PROMETEOWEB/ws/pl/postulacion/libro",
        "uriWebDeletePublishedBook" : "PROMETEOWEB/ws/pl/postulacion/libro/delete",
        "uriWebPublication" : "PROMETEOWEB/ws/pl/postulacion",
        "uriWebAffiliation" : "PROMETEOWEB/ws/pl/postulacion/afiliacion",
        "uriWebDeleteAffiliation" : "PROMETEOWEB/ws/pl/postulacion/afiliacion/delete",
        "uriWebScholarship" : "PROMETEOWEB/ws/pl/postulacion/beca",
        "uriWebDeleteScholarship" : "PROMETEOWEB/ws/pl/postulacion/beca/delete",
        "uriWebGetInsitutions" : "PROMETEOWEB/ws/pl/postulacion/institucion",
        "uriWebPreviousContact" : "PROMETEOWEB/ws/pl/postulacion/contacto",
        "uriWebCurriculumVitae" : "PROMETEOWEB/ws/pl/postulacion/cv",
        "uriWebDirectedThesis" : "PROMETEOWEB/ws/pl/postulacion/tesis",
        "uriWebDeleteDirectedThesis" : "PROMETEOWEB/ws/pl/postulacion/tesis/delete",
        "uriWebExpCourse" : "PROMETEOWEB/ws/pl/postulacion/ct",
        "uriWebDeleteExpCourse" : "PROMETEOWEB/ws/pl/postulacion/ct/delete",
        "uriWebPostdoc" : "PROMETEOWEB/ws/pl/postulacion/postdoctorado",
        "uriWebDeletePostdoc" : "PROMETEOWEB/ws/pl/postulacion/postdoctorado/delete",
        "uriWebToComplete" : "PROMETEOWEB/ws/pl/postulacion/porcompletar",
        "uriWebRegisterApplic" : "PROMETEOWEB/ws/pl/postulacion/enviar",
        "uriWebSendRecommendation" : "PROMETEOWEB/ws/pl/postulacion/recomendacion",
        "uriWebGetScales" : "PROMETEOWEB/ws/cl/calificacion/baremos",
        "uriWebGetScale" : "PROMETEOWEB/ws/cl/calificacion/baremo",
        "uriWebQualify" : "PROMETEOWEB/ws/cl/calificacion",
        "uriWebStartQualify" :  "PROMETEOWEB/ws/cl/calificacion/iniciar/calificacion/baremo",
        "uriWebSendQualify" : "PROMETEOWEB/ws/cl/calificacion/criterio"
        //"uriWebQualify" : "PROMETEOWEB/ws/cl/calificacion/calificar",
    }
});

