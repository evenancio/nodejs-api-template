# NodeJS API Template

This is the template that I usually use for my NodeJS APIs.

After you clone it, open your console and type:

```
npm i
```

Then, go to .env file and fill in the fields based on your environment.

### Docker File

As an alternative, if you want to use your Docker enviroment, open your Terminal and type

```
docker-compose up
```

### Updating your Package.json

Feel free to update the depencies, however keep in mind that adjustments might be required after that.

If you still want to update them, just replace the package.json to

```
{
    "name": "nodejs-api-template",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "engines": {
        "node": "14.x"
    },
    "scripts": {
        "dev": "nodemon index.js",
        "debug": "nodemon --inspect index.js",
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js"
    },
    "author": "",
    "license": "ISC"
}
```

Then, go to your terminal and type

```
npm i async-redis axios basic-auth bcrypt body-parser compression cors date-fns express express-jwt express-sanitizer glob lodash mongoose mongoose-hidden mongoose-paginate-v2 mongoose-patch-history morgan pm2 url uuid winston
```

```
npm i nodemon dotenv chai chai-http mocha --save-dev
```
