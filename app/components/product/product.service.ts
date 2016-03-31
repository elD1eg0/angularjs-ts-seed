import ngModuleName from './product.module';

'use strict';

export interface IProduct {
  drugName: string;
  ndc: string;
  upc?: string;
  wic?: string;
  quickCode?: string;
  preferredDrug?: boolean;
  manufacturer?: string;
  totalPkgQty?: string;
  img?: string;
  storageRequirement?: string;
  expirationDate?: Date;
  productDescription?: string;
}

const ngServiceName = 'productService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class ProductService {

  public headers: Array<string> = ['DrugName', 'NDC', 'UPC', 'WIC', 'Quick code'];

  public products: Array<IProduct> = [
    {
      drugName: 'Admin',
      ndc: 'contact@flatlogic.com',
      upc: '',
      wic: '',
      quickCode: 'Fabritsiusa str, 4',
      preferredDrug: false,
      manufacturer: 'FlatLogic Inc.',
      totalPkgQty: 'Minsk',
      img: 'nhkil',
      storageRequirement: 'umue4y4ju',
      expirationDate: new Date(2010, 10, 3),
      productDescription: 'We are young and ambitious full service design and technology company.'
    },
    {
      drugName: 'Admin',
      ndc: 'contact@flatlogic.com',
      upc: '',
      wic: '',
      quickCode: 'Fabritsiusa str, 4',
      preferredDrug: false,
      manufacturer: 'FlatLogic Inc.',
      totalPkgQty: 'Minsk',
      img: 'nhkil',
      storageRequirement: 'umue4y4ju',
      expirationDate: new Date(2010, 10, 3),
      productDescription: 'We are young and ambitious full service design and technology company.'
    },
    {
      drugName: 'Admin',
      ndc: 'contact@flatlogic.com',
      upc: '',
      wic: '',
      quickCode: 'Fabritsiusa str, 4',
      preferredDrug: false,
      manufacturer: 'FlatLogic Inc.',
      totalPkgQty: 'Minsk',
      img: 'nhkil',
      storageRequirement: 'umue4y4ju',
      expirationDate: new Date(2010, 10, 3),
      productDescription: 'We are young and ambitious full service design and technology company.'
    }
  ];

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public loadAllItems() {
    return this.q.when(this.products);
  }

  public loadDropDownList() {
    return this.q.when(this.headers);
  }

  public searchItems(searchFor: string) {
    let productSearch: Array<IProduct> = [];
    this.products.forEach(product => {
      if (!(product.drugName.indexOf(searchFor) === -1))
        productSearch.push(product);
    });
    return this.q.when(productSearch);
  }

}
