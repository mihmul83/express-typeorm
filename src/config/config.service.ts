import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Service } from 'typedi';

export interface EnvConfig {
  [key: string]: string;
}

@Service()
export class ConfigService {
  private readonly config: EnvConfig = {};
  public static NODE_ENV: string = process.env.NODE_ENV || 'development';
  public static isDevelopment: boolean = process.env.NODE_ENV === 'development';
  constructor (filePath: string) {
    try {
      if (filePath && filePath.length > 0) {
        if (fs.existsSync(filePath)) {
          this.config = dotenv.parse(fs.readFileSync(filePath));
        } else {
          console.log(`Config file ${filePath} doesn't exist. Skipping`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  get (name: string): string {
    try {
      return process.env[name] || this.config[name];
      // eslint-disable-next-line no-empty
    } catch (e) { }
    return '';
  }
}
