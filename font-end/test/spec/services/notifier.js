'use strict';

describe('Service: Notifier', function () {

  // load the service's module
  beforeEach(module('jwtTraiApp'));

  // instantiate service
  var Notifier;
  beforeEach(inject(function (_Notifier_) {
    Notifier = _Notifier_;
  }));

  it('should do something', function () {
    expect(!!Notifier).toBe(true);
  });

});
