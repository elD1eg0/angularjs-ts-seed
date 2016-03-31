import ngModuleName from './product.module';

'use strict';

const ngDirectiveName = 'tsfnValidationSync';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  scope: [],
  link: (scope, elm, attrs, ctrl) => {

    let expr = /^[0-9]{5}[-][0-9]{4}[-][0-9]{2}$/;

    ctrl['$validators'].ndcError = (modelValue, viewValue) => {

      if (ctrl['$isEmpty'](modelValue)) {
        // consider empty model valid
        return true;
      }

      if (expr.test(viewValue)) {
        // ndc is invalid
        return true;
      }
      // ndc is invalid
      return false;
    };
  }
})
@at.inject('$log')
export default class ValidationSyncDirective {
  constructor(private log: angular.ILogService) {
    log.debug(['ngDirectiveName', ngDirectiveName, 'loaded'].join(''));
  }
}
