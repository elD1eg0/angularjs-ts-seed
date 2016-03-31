import ngModuleName from './product.module';
import ProductService from './product.service';
import {IProduct} from './product.service';

'use strict';

const ngComponentName = 'tsfnProduct';

@at.directive(ngModuleName, 'tabList', {
  restrict: 'E',
  templateUrl: 'product/tab-list.tpl.html'
})

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'product/product.component.html',
})
@at.inject('$log', 'productService', '$mdDialog')
export default class ProductComponent implements at.OnInit {
  public headers: Array<string> = [];
  public products: Array<IProduct> = [];
  public dropList: string = '';
  public searchText: string = '';
  public drugName: string;
  public ndc: string;
  public upc: string;
  public wic: string;
  public quickCode: string;
  public preferredDrug: boolean;
  public manufacturer: string;
  public totalPkgQty: string;
  public expirationDate: Date;
  public imgSrc: string;
  public dialogTpl: string;
  public selected = null;
  public locals;
  public product = {
    drugName: '',
    ndc: '',
    upc: '',
    wic: '',
    quickCode: '',
    identifiers: '',
    manufacturer: '',
    totalPkgQty: '',
    img: '',
    storageRequirement: '',
    expirationDate: new Date,
    productDescription: ''
  };

  constructor(private log: angular.ILogService, private productService: ProductService, private mdDialog: angular.material.IDialogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
    productService.loadAllItems().then(products => this.products = [].concat(products));
    this.dialogTpl = 'product/product-dialog.tpl.html';
    this.selected = this.locals && this.locals.selected;
  }

  public $onInit() {
    this.productService.loadDropDownList()
      .then(headers => this.headers = [].concat(headers));
    this.productService.loadAllItems()
      .then(products => this.products = [].concat(products));
  }

  public addProduct() {
    if (this.drugName && this.ndc) {
      var product: IProduct = {
        drugName: this.drugName,
        ndc: this.ndc,
        upc: this.upc,
        wic: this.wic,
        quickCode: this.quickCode,
        preferredDrug: this.preferredDrug,
        manufacturer: this.manufacturer,
        totalPkgQty: this.totalPkgQty,
        expirationDate: this.expirationDate
      };
      this.products.push(product);
    }
  }

  public searchProduct(searchText) {
    this.productService.searchItems(searchText)
      .then(products => this.products = [].concat(products));
  }

  public selectProduct(product) {
    console.log('OK!');
    this.mdDialog.show({
      templateUrl: this.dialogTpl,
      controller: () => { },
      controllerAs: 'dialogCtrl',
      clickOutsideToClose: true,
      locals: { selected: product },
      bindToController: true
    });
  };

}
