import ngModuleName from './widget.module';

'use strict';

const ngServiceName = 'uploadimageService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', '$http')
export default class UploadimageService {

  constructor(private log: angular.ILogService, private q: angular.IQService, private http: angular.IHttpService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public uploadFileToUrl(file, uploadUrl) {
    var fd = new FormData();
    fd.append('file', file);

    this.http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    })

      .success(function() {
      })

      .error(function() {
      });
  }

}
