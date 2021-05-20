export class LocationModel {
  latitude: number;
  longitude: number;
}

export class AddressModel {
  id: number;
  country: string;
  city: string;
  street: string;
  state: string;
  zip: string;
  location?: LocationModel;
}
