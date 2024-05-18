import { IUser } from '../interfaces/user';

export class UserDto implements IUser {
  password: string;
  cardNumber: string;
  login: string;
  email: string;
  id: string;
}
