import glob from 'glob';

export default (app) =>
  class ApplicationRoutes {
    constructor() {}

    static async init() {
      glob('src/**/routes.js', (err, files) => {
        files.forEach(async (file) => {
          if (file.substring(file.length - 3) === '.js') {
            (await import(`./${file.substring(4)}`)).default(app);
          }
        });
      });
    }
  };
