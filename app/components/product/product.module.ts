import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.product';

export default angular.module(ngModuleName, ['ngComponentRouter', 'ngMessages', Material])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
