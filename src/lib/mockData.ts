export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}