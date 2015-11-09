import Waterline from 'waterline';
import {join} from 'path';
import fs from 'fs';

export default function (app) {
  return new Promise((resolve, reject) => {
    let waterline = new Waterline();
    let modelPath = __dirname + '/../database/model';

    // load models
    fs.readdirSync(modelPath).forEach((filename) => {
      waterline.loadCollection(require(join(modelPath, filename)));
    });

    waterline.initialize(app.config.waterline, (err, models) => {
      if (err) {
        return reject(err);
      }
  
      app.models = models.collections;
      app.connections = models.connections;

      return resolve();
    });

  });
}