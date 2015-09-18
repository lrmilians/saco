'use strict';

describe('Controller: processApplicSection2Ctrl', function () {

  // load the controller's module
  beforeEach(module('prometeoApp'));

  var mainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('processApplicSection2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


  it('prueba processApplicSection2', function () {
    expect(3).toBe(3);
  });
});

/*describe('Controller: educationDialogCtrl', function () {

  // load the controller's module
  beforeEach(module('prometeoApp'));

  var mainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    //modalInstance = $modalInstance;
    mainCtrl = $controller('educationDialogCtrl', {
      $scope: scope
    });
  }));


  it('prueba processApplicSection2', function () {
    expect(3).toBe(3);
  });
});*/
