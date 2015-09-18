'use strict';

describe('Controller: userRegisterCtrl', function () {

    // load the controller's module
    beforeEach(module('prometeoApp'));

    var userRegisterCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        userRegisterCtrl = $controller('userRegisterCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('Cantidad de idiomas definidas en el sistema (2)', function () {
        expect(userRegisterCtrl.idiomas.length).toBe(2);
    });

    it('validacion de nombre de usuario', function () {
        expect('username').toMatch(scope.patternUserName);
        expect('username1234').toMatch(scope.patternUserName);
        expect('use3rname4').toMatch(scope.patternUserName);
    });
    it('validacion de nombre y apellidos', function () {
        expect('nme second name').toMatch(scope.patternFirstName);
        expect('last name').toMatch(scope.patternLastName);
    });

});

