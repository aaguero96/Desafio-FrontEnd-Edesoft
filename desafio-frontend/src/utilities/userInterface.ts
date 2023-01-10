interface IUserName {
  firstname: string;
  lastname: string;
}

interface IGeolocation {
  lat: string;
  long: string;
}

interface IUserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: IGeolocation;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: IUserName;
  address: IUserAddress;
  phone: string;
}

export interface IHeaders {
  header: string;
  key: string;
}

export interface IUserFilter {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
}