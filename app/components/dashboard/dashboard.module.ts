import Material from '../material/material';
import Panel from './panel/panel';

'use strict';

const ngModuleName = 'app.components.dashboard';

export default angular.module(ngModuleName, ['ui.router', Material, Panel])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
