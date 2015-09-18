myApplic.directive('mydatepicker', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var language = "es";
            var format = "dd/mm/yyyy";
            var f = new Date();
            if($translate.use() == "en_US"){
                language = "en";
                var endDate =   (f.getMonth() + 1) + "/" + f.getDate() + "/" + (f.getFullYear() - 18);
                format = "mm/dd/yyyy";
            } else {
                var endDate = f.getDate()+ "/" + (f.getMonth() +1) + "/" + (f.getFullYear() - 18);
            }
            angular.element(element).datepicker({
                language: language,
                orientation: "top auto",
                autoclose: true,
                endDate: endDate,
                format: format,
                todayHighlight: true
            });
        }
    };
});

myApplic.directive('mydatepickerYear', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var language = "es";
            if($translate.use() == "en_US"){
                language = "en";
            }
            var f = new Date();
            var endDate = f.getDate()+ "/" + (f.getMonth() +1) + "/" + (f.getFullYear());
            angular.element(element).datepicker({
                language: language,
                orientation: "top auto",
                autoclose: true,
                endDate: endDate,
                format: "yyyy",
                startView: 1,
                minViewMode: 2
            });
        }
    };
});

myApplic.directive('mydatepickerRangedate', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var language = "es";
            var format = "dd/mm/yyyy";
            var f = new Date();
            if($translate.use() == "en_US"){
                language = "en";
                var endDate = (f.getMonth() +1) + "/" + f.getDate()+ "/" + (f.getFullYear());
                format = "mm/dd/yyyy";
            } else {
                var endDate = f.getDate()+ "/" + (f.getMonth() +1) + "/" + (f.getFullYear());
            }
            angular.element(element).datepicker({
                language: language,
                orientation: "buttomop auto",
                autoclose: true,
                endDate: endDate,
                format: format,
                todayHighlight: true
            });
        }
    };
});

myApplic.directive('mydatepickerRangedateYear', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var language = "es";
            if($translate.use() == "en_US"){
                language = "en";
            }
            var f = new Date();
            var endDate = f.getDate()+ "/" + (f.getMonth() +1) + "/" + (f.getFullYear());
            angular.element(element).datepicker({
                language: language,
                orientation: "buttomop auto",
                autoclose: true,
                format: "yyyy",
                startView: 1,
                minViewMode: 2,
                endDate: endDate
            });
        }
    };
});

myApplic.directive('loadFilename', function($translate,dialogs){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function(e){
                if (this.files[0] !== undefined) {
                    if(this.files[0].type == "application/pdf" ||
                        this.files[0].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                        this.files[0].type == "application/msword" ||
                        this.files[0].type == "image/jpeg"
                    ){
                        if(this.files[0].size > 5242880){
                            var fileSize = this.files[0].size;
                            var fileupload = element;
                            fileupload.replaceWith(fileupload = fileupload.val('').clone(true));
                            $translate('msgFileSize').then(function (msg) {
                                dialogs.error('Error', msg + ' ' + parseFloat(fileSize/1048576).toFixed(2) + ' Mb');
                            });
                            return false;
                        } else {
                            var file = this.files[0];
                            scope.file = file;
                            return true;
                        }
                    } else {
                        var fileupload = element;
                        fileupload.replaceWith(fileupload = fileupload.val('').clone(true));
                        $translate('msgFileType').then(function (msg) {
                            dialogs.error('Error', msg);
                        });
                        return false;
                    }
                }
            });
        }
    };
});

myApplic.directive('phoneInput', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).intlTelInput({
                nationalMode: true,
                defaultCountry: "auto",
                geoIpLookup: function(callback) {
                    $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                },
                utilsScript: "bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
            });
        }
    };
});

myApplic.directive('phoneValueInt', function($translate) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).on("keyup change", function() {
                switch (attrs.id){
                    case "mainPhone":
                        scope.mainPhone = angular.element(element).intlTelInput("getNumber");
                        break;
                    case "secondPhone":
                        scope.secondPhone = angular.element(element).intlTelInput("getNumber");
                        break;
                }
            });
        }
    };
});

myApplic.directive('hboTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = $(elm[0]);
            $(jqueryElm).tabs()
        }
    };
})

myApplic.directive('numberSpinner', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            var action;
            angular.element(element).mousedown(function (){
                btn = $(this);
                var input = btn.closest('.number-spinner').find('input');
                btn.closest('.number-spinner').find('button').prop("disabled", false);
                var value;
                if (btn.attr('data-dir') == 'up'){
                    value = '';
                    if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                        value = parseInt(input.val()) + 1;
                        input.val(value);
                        scope.q.valueQSelected = value;
                    }else{
                        btn.prop("disabled", true);
                    }
                } else {
                    value = '';
                    if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                        value = parseInt(input.val())-1;
                        input.val(value);
                        scope.q.valueQSelected = value;
                    }else{
                        btn.prop("disabled", true);
                    }
                }
            }).mouseup(function(){
                clearInterval(action);
            });
        }
    };
});

myApplic.directive('numbersOnly', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            var validateNumber = function (inputValue) {
                var maxLength = 6;
                if (attrs.max) {
                    maxLength = attrs.max;
                }
                if (inputValue === undefined) {
                    return '';
                }
                var transformedInput = inputValue.replace(/[^0-9]/g, '');

                if (transformedInput !== inputValue) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }
                if (transformedInput.length > maxLength) {
                    transformedInput = transformedInput.substring(0, maxLength);
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }
                var isNotEmpty = (transformedInput.length === 0) ? false : true;
                ctrl.$setValidity('notEmpty', isNotEmpty);
                var isPattern = (parseInt(inputValue) >= parseInt(attrs.min) && parseInt(inputValue) <= parseInt(attrs.max)) ? true : false;
                ctrl.$setValidity('pattern', isPattern);

                return transformedInput;
            };

            ctrl.$parsers.unshift(validateNumber);
            ctrl.$parsers.push(validateNumber);
            attrs.$observe('notEmpty', function () {
                validateNumber(ctrl.$viewValue);
            });
        }
    };
});

myApplic.directive('wysiwyg', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            angular.element(element).wysiwyg();
        }
    };
});

myApplic.directive('cleanhtml', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            angular.element(element).cleanHtml();;
        }
    };
});

myApplic.directive("contenteditable", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
        }
    };
});




