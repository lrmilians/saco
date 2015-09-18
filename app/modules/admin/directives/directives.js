myAdmin.directive('myStrengthpass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).strength({
                strengthClass: 'strength',
                strengthMeterClass: 'strength_meter',
                strengthButtonClass: 'button_strength',
                idElement: 'password_input'
            });
        }
    };

});

myAdmin.directive('showCombo', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
});

myAdmin.directive('scrollNotifications',function () {
    function link(scope, element, attrs) {
        scope.$watch(function(){
            if(element[0].offsetHeight > 200){
                scope.styleScrollNotifications = {
                    'height' : 200,
                    'overflow-y': 'scroll'
                 };
            }
        });
    }
    return {
        restrict: 'AE',
        link: link
    };
});

myAdmin.directive('scrollProccess',function () {
    function link(scope, element, attrs) {
        scope.$watch(function(){
            if(element[0].offsetHeight > 200){
                scope.styleScrollProccess = {
                    'height' : 200,
                    'overflow-y': 'scroll'
                };
            }
        });
    }
    return {
        restrict: 'AE',
        link: link
    };
});



