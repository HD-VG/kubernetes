/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';

export class Password {
  private encrypted: string;

  constructor(plainPassword: string, secretKey?: string) {
    if (secretKey) {
      const bytes = CryptoJS.AES.decrypt(plainPassword, secretKey);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      this.encrypted = bcrypt.hashSync(decryptedPassword, 10);
    } else {
      this.encrypted = plainPassword;
    }
  }

  public getEncrypted(): string {
    return this.encrypted;
  }

  public compare(plainPassword: string, secretKey?: string): boolean {
    let decryptedPassword = plainPassword;
    
    if (secretKey) {
      const bytes = CryptoJS.AES.decrypt(plainPassword, secretKey);
      decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    }

    return bcrypt.compareSync(decryptedPassword, this.encrypted);
  }

  public static fromEncrypted(encryptedPassword: string): Password {
    return new Password(encryptedPassword);
  }
}