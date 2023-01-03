export interface loginModel {
  roles: Array<string>;
  token: string;
}
export interface registerModel {
  role: number;
  token: string;
}

export interface IUser {
  address: string;
  avatar: string;
  birthday: Date;
  email: string;
  enable: true;
  fullname: string;
  gender: string;
  id: string;
  phone: string;
  roles: Array<string>;
}
