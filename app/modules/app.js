'use strict';
/**
 * @ngdoc overview
 * @name prometeoApp
 * @description
 * # prometeoApp
 *
 * Main module of the application.
 */
angular
    .module('prometeoApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate',
        'angularFileUpload',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap',
        'dialogs.main',
        'main',
        'admin',
        'applic'
    ])
    .constant('APP_NAME','SistemaPrometeo')
    .constant('APP_VERSION','0.0.1')
    .constant('PROPIEDADES', {
        "propiedades" :	{
            "Idiomas" : [
                { "id" : 1 , "descripcion" : "catSpanish", "sufijo" : "es_ES" },
                { "id" : 2 , "descripcion" : "catEnglish", "sufijo" : "en_US" }
            ],
            "Genders" : [
                {"id" : "F", "description" : "catFemale"},
                {"id" : "M", "description" : "catMale"}
            ],
            "server" : "http://192.168.2.60",
            "port"	: "8080"
        }
    })

    .run(function($rootScope, $location, $cookieStore){
        var templateUrl = [
                'modules/admin/views/dashboard.html',
                'modules/applic/views/acceptance-application-conditions.html',
                'modules/applic/views/select-profile-type.html',
                'modules/applic/views/section1-general-information.html',
                'modules/applic/views/section2-education.html',
                'modules/applic/views/section3-university-teaching.html',
                'modules/applic/views/section4-work-experience.html',
                'modules/applic/views/section5-affiliation.html',
                'modules/applic/views/section6-file.html',
                'modules/applic/views/section7-to-complete.html',
                'modules/applic/views/recommend-candidate.html',
                'modules/applic/views/application-detail.html',
                'modules/applic/views/select-scale.html',
                'modules/applic/views/application-qualify.html',
                'modules/applic/views/describe-validation.html',
            ];
        var templateUrlApplic = [
            'modules/applic/views/section1-general-information.html',
            'modules/applic/views/section2-education.html',
            'modules/applic/views/section3-university-teaching.html',
            'modules/applic/views/section4-work-experience.html',
            'modules/applic/views/section5-affiliation.html',
            'modules/applic/views/section6-file.html',
            'modules/applic/views/section7-to-complete.html',
            'modules/applic/views/recommend-candidate.html',
        ];
        var templateUrlAnalist = [
            'modules/applic/views/select-scale.html',
            'modules/applic/views/application-qualify.html',
            'modules/applic/views/describe-validation.html',
        ];
        $rootScope.$on('$routeChangeStart', function(even, next, current){
            if($cookieStore.get('login') == false || $cookieStore.get('login') == null){
                for(var i in templateUrl){
                    if(templateUrl[i] == next.templateUrl){
                        $location.path('/');
                    }
                }
            } else {
                var user = $cookieStore.get('user');
                if(user.userRole == "Postulante"){
                    if($cookieStore.get('instanceApplic') === "ENVIADO"){
                        for(var i in templateUrlApplic){
                            if(templateUrlApplic[i] == next.templateUrl){
                                $location.path('/dashboard');
                            }
                        }
                    }
                    for(var i in templateUrlAnalist){
                        if(templateUrlAnalist[i] == next.templateUrl){
                            $location.path('/dashboard');
                        }
                    }
                }
                if(user.userRole == "Analista"){
                    for(var i in templateUrlApplic){
                        if(templateUrlApplic[i] == next.templateUrl){
                            $location.path('/dashboard');
                        }
                    }
                }
                if (next.templateUrl == 'modules/admin/views/user-login.html'){
                    $location.path('/dashboard');
                }
            }
        })

    })

    .config(function($httpProvider) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'
        };
    })

    .config(['dialogsProvider',function(dialogsProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(false);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('md');
    }])

    .config (function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [{
                    prefix: 'languages/adminmodule/locale-',
                    suffix: '.json'
                }, {
                    prefix: 'languages/mainmodule/locale-',
                    suffix: '.json'
                }, {
                    prefix: 'languages/applicmodule/locale-',
                    suffix: '.json'
                }]
            });
            $translateProvider.preferredLanguage('es_ES');
            $translateProvider.useCookieStorage();
            $translateProvider.useSanitizeValueStrategy('escaped');
        })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/select-profile-type', {
                templateUrl: 'modules/applic/views/select-profile-type.html',
                controller: 'startApplicCtrl',
                activetab: 'start'
            })
            .otherwise({
                redirectTo: '/'
            });
    });