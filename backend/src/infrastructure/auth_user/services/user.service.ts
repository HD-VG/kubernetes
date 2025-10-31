/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UserService {

  async encriptPassword(password: string): Promise<string> {
    const AES_SECRET_KEY = process.env.SECRET_KEY
    const salt = CryptoJS.AES.decrypt(password, AES_SECRET_KEY);
    const plainPassword = salt.toString(CryptoJS.enc.Utf8);
    return await bcrypt.hash(plainPassword, 10);;
  }
}
