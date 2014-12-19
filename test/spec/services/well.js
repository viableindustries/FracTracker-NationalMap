'use strict';

describe('Service: Well', function () {

  // load the service's module
  beforeEach(module('nationalMapApp'));

  // instantiate service
  var Well;
  beforeEach(inject(function (_Well_) {
    Well = _Well_;
  }));

  it('should do something', function () {
    expect(!!Well).toBe(true);
  });

});
