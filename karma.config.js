// Karma configuration
// Generated on Sat Jul 11 2015 11:53:45 GMT-0500 (ECT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/jquery-ui/jquery-ui.min.js',
        'app/bower_components/angular/angular.min.js',
        'app/bower_components/angular-translate/angular-translate.min.js',
        'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
     //   'app/bower_components/bootstrap/dist/js/bootstrap-datepicker.min.js',
      //  'app/bower_components/bootstrap/dist/locales/bootstrap-datepicker.es.min.js',
        'app/bower_components/angular-animate/angular-animate.min.js',
        'app/bower_components/angular-aria/angular-aria.min.js',
        'app/bower_components/angular-cookies/angular-cookies.min.js',
        'app/bower_components/angular-messages/angular-messages.min.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-resource/angular-resource.min.js',
        'app/bower_components/angular-route/angular-route.min.js',
        'app/bower_components/angular-sanitize/angular-sanitize.min.js',
        'app/bower_components/angular-touch/angular-touch.min.js',
        'app/bower_components/angular-file-upload/angular-file-upload.min.js',
        'app/bower_components/angular-file-upload/angular-file-upload-shim.min.js',
        'app/bower_components/angular-dialog-service/example/js/dialogs.min.js',
        'app/bower_components/angular-utils-pagination/dirPagination.js',
        'app/bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls.min.js',
        'app/bower_components/password-strength/ng-password-strength.min.js',
        'app/bower_components/password-strength/strength.js',
        'app/bower_components/intl-tel-input/js/intlTelInput.min.js',


        'app/modules/app.js',
        'app/modules/main/moduleMain.js',
        'app/modules/main/controllers/*.js',
        'app/modules/main/services/*.js',

        'app/modules/admin/moduleAdmin.js',
        'app/modules/admin/controllers/*.js',
        'app/modules/admin/services/*.js',
        'app/modules/admin/directives/*.js',
        'app/modules/admin/js/*.js',

        'app/modules/applic/moduleApplic.js',
        'app/modules/applic/controllers/*.js',
        'app/modules/applic/services/*.js',

        "test/spec/modules/main/controllers/*.js",
        "test/spec/modules/admin/controllers/*.js",
        "test/spec/modules/applic/controllers/*.js"

    ],


    // list of files to exclude
    exclude: [
        'app/bower_components/angular-animate/index.js',
        'app/bower_components/angular-aria/index.js',
        'app/bower_components/angular-bootstrap/*.js',
        'app/bower_components/angular-cookies/index.js',
        'app/bower_components/angular-messages/index.js',
        'app/bower_components/angular-mocks/ngAnimateMock.js',
        'app/bower_components/angular-mocks/ngMock.js',
        'app/bower_components/angular-mocks/ngMockE2E.js',
        'app/bower_components/angular-resource/index.js',
        'app/bower_components/angular-route/index.js',
        'app/bower_components/angular-sanitize/index.js',
        'app/bower_components/angular-touch/index.js',
        'app/bower_components/angular-utils-pagination/index.js',
        'app/bower_components/angular-utils-pagination/package.js',
        'app/bower_components/angular/index.js',
        'app/bower_components/bootstrap/dist/js/bootstrap-datepicker.min.js',
        //'app/bower_components/bootstrap/dist/js/bootstrap.js',
        'app/bower_components/jquery/src/*.js',
        'app/bower_components/jquery/src/**/*.js',
        'app/bower_components/bootstrap/dist/js/npm.js',
        'app/bower_components/bootstrap/dist/locales/**/*.js',
        'app/bower_components/bootstrap/grunt/*.js',
        'app/bower_components/bootstrap/package.js',
        'app/bower_components/intl-tel-input/lib/libphonenumber/src/utils.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
