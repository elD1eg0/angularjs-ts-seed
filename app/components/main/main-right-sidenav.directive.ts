import ngModuleName from './main.module';
import MainController from './main.controller';

'use strict';

const ngDirectiveName = 'tsfnMainRightSidenav';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  templateUrl: 'main/main-right-sidenav.directive.html'
})
export default class MainRightSidenavDirective extends MainController {
}