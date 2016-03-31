import ngModuleName from './widget.module';
import {IUser} from './userlist.model';

'use strict';

const ngControllerName = 'UserdialogController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log')
export default class UserdialogController {

  public selected = null;
  public locals;

  constructor(private log: angular.ILogService){
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
    this.selected = this.locals && this.locals.selected;
  }

}
