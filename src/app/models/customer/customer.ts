export interface ICustomerLogin {
  email: string; // <-- username yerine tekrar email yaptık
  password: string;
}

export interface ICustomerRegister {
  name: string;
  surname: string;
  email: string; // <-- username yerine tekrar email yaptık
  password: string;
  phone: string; 
}

export interface ICustomerResponse {
  cid: number;
  name: string;
  surname: string;
  email: string;
}