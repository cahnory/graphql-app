import Waterline from 'waterline';
import fs from 'fs';

export default function (app) {
  return new Promise((resolve, reject) => {
    let waterline = new Waterline();

    // load models
    fs.readdirSync(__dirname + '/../models').forEach((filename) => {
      waterline.loadCollection(require(__dirname + '/../models/' + filename));
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