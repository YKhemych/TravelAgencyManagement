import { AddressModel } from './address.model';

export class CompanyModel {
  id: number;
  email: string;
  name: string;
  address: AddressModel;
  isActive: boolean;
}

export class CompanyDataModel {
  data: CompanyModel;
}
