import ngModuleName from './widget.module';
import {IUser} from './userlist.model';

'use strict';

const ngServiceName = 'userlistService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class UserlistService {
  private users: Array<IUser> = [
    { userText: 'E=mc^2', name: 'Einstein', img: '/assets/images/einstein.jpg', done: false },
    { userText: 'battilapesca', name: 'Faynsantos', img: '/assets/images/feynman.jpg', done: false }
  ];

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public loadAllItems() {
    return this.q.when(this.users);
  }

}
