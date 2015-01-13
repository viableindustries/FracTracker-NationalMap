'use strict';

describe('Directive: geocoder', function () {

  // load the directive's module
  beforeEach(module('nationalMapApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<geocoder></geocoder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the geocoder directive');
  }));
});
