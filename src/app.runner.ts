import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import * as FileSystem from 'fs';
import * as OperatingSystem from 'os';
import * as Crypto from 'crypto';

@Injectable()
export class AppRunner implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    // Your initialization code here
    console.log('Application has started!');

    // Generate a random JWT secret (256 bits / 32 bytes)
    const jwtSecret = Crypto.randomBytes(32).toString('hex');

    // Read file from hdd & split it from a linebreak to a array
    const ENV_VARS = FileSystem.readFileSync('./.env', 'utf8').split(OperatingSystem.EOL);

    // Find the env we want based on the key
    const target = ENV_VARS.indexOf(
      ENV_VARS.find((line) => {
        return line.match(new RegExp('JWT_SECRET'));
      }),
    );

    // Replace the key/value with the new value
    ENV_VARS.splice(target, 1, `JWT_SECRET=${jwtSecret}`);

    // Write everything back to the file system
    FileSystem.writeFileSync('./.env', ENV_VARS.join(OperatingSystem.EOL));
  }
}
