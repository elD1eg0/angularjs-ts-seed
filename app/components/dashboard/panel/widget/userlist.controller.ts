import ngModuleName from './widget.module';
import {IUser} from './userlist.model';
import UserlistService from './userlist.service';
import UserdialogController from './userdialog.controller';
import UploadimageService from './uploadimage.service';

'use strict';

const ngControllerName = 'UserlistController';

@at.directive(ngModuleName, 'fileModel', {
  restrict: 'A',
  link: (scope, element, attrs) => {
    // debugger;
    var model = scope['vm'].parse(attrs['fileModel']);
    var modelSetter = model.assign;
    let test: string = 'ciao';
    element.bind('change', () => {
      scope.$apply(() => {
        // debugger;
        modelSetter(scope, element[0]['files'][0]);
      });
    });
  }
})

@at.controller(ngModuleName, ngControllerName)
@at.inject('$scope', '$log', 'userlistService', '$mdDialog', 'uploadimageService', '$parse')
export default class UserlistController {
  public isClicked = false;
  public users: Array<IUser> = [];
  public userText: string;
  public userName: string;
  public imgSrc: string;
  public dialogTpl: string;
  public selected = null;
  public locals;
  public myFile: string = null;

  constructor(private scope: angular.IScope, private log: angular.ILogService,
    private userlistService: UserlistService, private mdDialog: angular.material.IDialogService,
    private uploadimageService: UploadimageService,
    private parse: angular.IParseService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
    userlistService.loadAllItems().then(users => this.users = [].concat(users));
    this.dialogTpl = 'dashboard/panel/widget/userdialog.tpl.html';
    this.selected = this.locals && this.locals.selected;
  }

  public addUser() {
    if (this.userName)
      this.users.push({ name: this.userName, userText: this.userText, img: this.imgSrc = '/assets/images/einstein.jpg', done: false });
    this.userName = '';
    this.userText = '';
    this.imgSrc = '';
    this.resetValidation();

  }

  public resetValidation(){
    this.scope['usersForm'].$setPristine();
    this.scope['usersForm'].$setValidity();
    this.scope['usersForm'].$setUntouched();
  }

  public checked(users) {
    let buff = false;
    for (var i = 0; i < users.length; i++)
      buff = buff || users[i].done;
    return buff;
  }

  public archive() {
    for (var i = 0; i < this.users.length; i++)
      if (this.users[i].done)
        this.users.splice(i, 1);
  }

  public get remaining() {
    return this.users.reduce((count, user) => count += user.done ? 0 : 1, 0);
  }

  public toggleAll() {
    let done = this.remaining > 0;
    angular.forEach(this.users, user => user.done = done);
  }

  public selectUser(user) {
    this.mdDialog.show({
      templateUrl: this.dialogTpl,
      controller: UserdialogController,
      controllerAs: 'vm',
      clickOutsideToClose: true,
      locals: { selected: user },
      bindToController: true
    });
  };

  public resetCB() {
    this.isClicked = false;
    angular.forEach(this.users, user => user.done = false);
  }

  public uploadFile(myFile) {
    var file = this.myFile;
    console.log('file is ');
    console.dir(file);
    var uploadUrl = '/assets/images/';
    this.uploadimageService.uploadFileToUrl(file, uploadUrl);
  };
}
