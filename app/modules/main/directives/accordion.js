myMain.directive('myaccordion', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).accordion({
                collapsible: true,
                heightStyle: "content"
            });
        }
    };
});

myMain.directive('mydatepicker', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).datepicker({
            });
        }
    };
});
