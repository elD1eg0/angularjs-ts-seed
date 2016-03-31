import ngModuleName from './product.module';

'use strict';

const ngDirectiveName = 'tsfnValidation';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  scope: [],
  link: (scope, elm, attrs, ctrl) => {

    let drugNames = ['bob', 'scipione', 'diego'];

    ctrl['$asyncValidators'].drugNameError = (modelValue, viewValue) => {

      if (ctrl['$isEmpty'](modelValue))
        // consider empty model valid
        return scope['vm'].q.when();

      var def = scope['vm'].q.defer();

      scope['vm'].timeout(() => {
        // mock a delayed response
        if (scope['vm'].product.drugName.indexOf(viewValue) === -1)
          def.resolve();
        else
          // ndc is invalid
          def.reject();
      }, 1000);

      return def.promise;
    };
  }
})
@at.inject('$log')
export default class ValidationSyncDirective {
  constructor(private log: angular.ILogService) {
    log.debug(['ngDirectiveName', ngDirectiveName, 'loaded'].join(''));
  }
}
