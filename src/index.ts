import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { useExpressServer } from 'routing-controllers';
import { useContainer as rcUseContainer } from 'routing-controllers';
import { createConnection, useContainer as typeOrmUseContainer } from 'typeorm';
import { Container } from 'typedi';
import { Config } from './config/config.enum';
import { ConfigService } from './config/config.service';
import ormconfig from './database/index';
import { UserController } from './controllers/user.controller';
import { PhotoController } from './controllers/photo.controller';

rcUseContainer(Container);
typeOrmUseContainer(Container);

const config = new ConfigService(`.env.${process.env.NODE_ENV || 'development'}`);
const app = express();

app.enable('trust proxy');
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended: true }));
app.use(express.json());

createConnection(ormconfig).then(async connection => {
  useExpressServer(app, {
    controllers: [
      UserController,
      PhotoController
    ]
  });  
  app.listen(config.get(Config.PORT), () => console.log(`Running on port ${config.get(Config.PORT)}`));
}).catch(e => {
  console.log("Error: ", e);
});

