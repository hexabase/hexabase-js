import http from 'http';
import https from 'https';

class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class HexabaseSdkError extends BaseError {
  constructor(e:string) {
    super(e);
  }
}

export interface HexabaseSdkOptions {
  protocol?: string,
  host?: string,
  port?: number,
  path?: string,
  debug?: boolean
}

interface LoginRequest {
  email: string;
  password: string;
}

export class Hexabase {
  private options: HexabaseSdkOptions = {};
  constructor(options? :HexabaseSdkOptions) {
    if (options !== undefined) {
      this.options = options;
    }
  }

  public login(email:string, password:string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      const usingSsl: boolean = this.options.protocol === 'https';
      const httpModule = usingSsl ? https : http;
      const params: LoginRequest = {
        email: email,
        password: password
      }

      const options: http.RequestOptions = {
        host: this.options.host,
        port: this.options.port,
        path: `${this.options.path}/login`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const req = httpModule.request(options, (res) => {
        if (res.statusCode == 200) {
          this.console(`login successfull`);
          res.on('data', (chunk) => {
            this.console(`login response data:${chunk}`);
            resolve(JSON.parse(chunk).token);
          })
        } else {
          this.console(`login failed. statusCode:${res.statusCode}`);
          reject(new HexabaseSdkError('login failed'));
        }
      });
      req.on('error', (err) => {
        this.console(`login error:[${err}]`)
        reject(err);
      });
      req.write(JSON.stringify(params));
      // req.setTimeout(this.options.timeout || 2000 * 60, () => {
      //   reject(new HexabaseSdkError('request timeout'));
      // });

      req.end();
    });
  }

  private console(msg: string) {
    if (this.options.debug) {
      console.info(msg);
    }
  }
}
