import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async readAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async readById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(data): Promise<User> {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const userData = new this.userModel(data);
    return userData.save();
  }

  async update(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async auth(login: string, password: string) {
    const user: User = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'not exists' },
        HttpStatus.FORBIDDEN,
      );
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    console.log(password, user.password, isCorrectPassword);
    if (!isCorrectPassword) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'wrong password' },
        HttpStatus.FORBIDDEN,
      );
    }
    return { user, token: this.jwtService.sign({ id: user._id }) };
  }

  async register(data) {
    let user: User = await this.userModel.findOne({ login: data.login }).exec();
    if (user) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'already exists' },
        HttpStatus.CONFLICT,
      );
    }
    user = await this.create(data);
    return { user, token: this.jwtService.sign({ id: user._id }) };
  }

  async checkAuthUser(login: string, password: string) {
    const users = await this.userModel.find({ login, password });
    return users.length ? users : null;
  }
}
