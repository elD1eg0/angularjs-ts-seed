import Material from '../../../material/material';

'use strict';

const ngModuleName = 'app.components.dashboard.panel.widget';

export default angular.module(ngModuleName, ['ngComponentRouter', 'ngMessages', Material, 'nvd3'])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
