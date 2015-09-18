'use strict';

describe('Controller: dashboardCtrl', function () {

    // load the controller's module
    beforeEach(module('prometeoApp'));

    var dashboardCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        dashboardCtrl = $controller('dashboardCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('Prueba unitaria', function () {
        expect(3).toBe(3);
    });

    /*it('validacion de nombre de usuario', function () {
        expect('username').toMatch(scope.patternUserName);
        expect('username1234').toMatch(scope.patternUserName);
        expect('use3rname4').toMatch(scope.patternUserName);
    });
    it('validacion de nombre y apellidos', function () {
        expect('nme second name').toMatch(scope.patternFirstName);
        expect('last name').toMatch(scope.patternLastName);
    });*/

});

