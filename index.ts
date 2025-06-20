import { Router } from './routes/route';
import { Controller } from './controllers/controller';
import { Service } from './services/service';
import { Model } from './models/model';
import dotenv from 'dotenv';

dotenv.config();

function main() {
  const model = new Model();
  const service = new Service(model);
  const controller = new Controller(service);

  const args = process.argv.slice(2);

  new Router(args, controller);
}

main();
