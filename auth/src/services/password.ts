import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async comparePasswords(storedPassword: string, suppliedPassword: string) {
    const [storedBuf, salt] = storedPassword.split('.');
    const suppliedBuf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return suppliedBuf.toString('hex') === storedBuf
  }
}
