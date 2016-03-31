import ngModuleName from './widget.module';
import {IUser} from './userlist.model';
import UploadimageService from './uploadimage.service';

'use strict';

const ngControllerName = 'UserlistController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log', 'uploadimageService')
export default class UploadimageController {
  private myFile : string;

  constructor(private log: angular.ILogService,
    private uploadimageService: UploadimageService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
  }

  public uploadFile(){
        var file = this.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = '/fileUpload';
        this.uploadimageService.uploadFileToUrl(file, uploadUrl);
    };

  };
