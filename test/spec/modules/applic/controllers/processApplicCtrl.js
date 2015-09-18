'use strict';

describe('Controller: processApplicCtrl', function () {

  // load the controller's module
  beforeEach(module('prometeoApp'));

  var mainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('processApplicCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


  it('otra prueba', function () {
    expect(3).toBe(3);
  });
});
