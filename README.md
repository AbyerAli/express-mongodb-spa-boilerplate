# ExpressJS Starter Boilerplate

A full fledeged ExpressJS REST API Boilerplate! This repository serves as a foundation for kickstarting your `Express.js + mongodb + SPA` projects. Features organized code structure, comprehensive API documentation, error handling, and more.

## installation

```bash
git clone https://github.com/AbyerAli/express-mongodb-spa-boilerplate.git
cd expressjs-starter-boilerplate
yarn install
yarn start
```
or 

```bash
npm i express-mongo-spa-boilerplate
```
or

```bash
npx express-mongo-spa-boilerplate
```

## Features

- **Dotenv Validation:** Environment variables are meticulously validated through the `config.js` file, ensuring a robust configuration setup.

- **Graceful Error Handling:** Easily craft false responses by utilizing the error throwing mechanism. For example:
  ```javascript
  throw new Error('Some error XYZ occurred');


- dotenv variables are validated at config.js
- throw error in the API to send false reponse e.g. `throw new Error('some error xyz occured')`
- apidoc is generated at /public/apidoc, so remember to update docs before pushing to production with `yarn run apidoc`
- `yarn run apidoc` will generate the docs in /public/apidoc
- apidocs usage:
```js

/**
    * @api {post} /v1/users/login user login
    * @apiVersion 1.0.0
    * @apiName login user
    * @apiGroup users   
    * @apiPermission authenticated user
    * @apiBody {String} email should follow the email format.
    * @apiBody {String} password should be at least 8 characters long.
    * @apiExample {js} Example usage 1:
    * const user = {
    *   "email": "John Doe",
    *   "password": "xyz"
    * }
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    * @apiExample {js} Example usage 2:
    * const user = {
    *   "email": "John Doe",
    *   "password": "xyz"
    * }
    * axios.defaults.headers.common["Authorization"] = token;
    * axios.post(url, data)
    *  .then((res, status) => doSomethingHere())
    * .catch((err, status) => doSomethingHere());
    *
    * @apiSuccess (Success 200) {String} token token to access the api
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    *     {
    *      "status": true,
    *      "message": "Task saved successfully!",
    *       "data": {
    *           token: "xyz"
    *      },
    *    }
    * @apiUse UnauthorizedError
*/
router.post('/login', validateUser, userController.userlogin);
```
- public contains any static files that will be served to the client.
- routes contains all the routes for the application.
- controllers contains all the controllers for the application.
- models contains all the models, schemas for the application.
- services contains all the services for the application like `S3, Multer, Mailer etc`.
- helpers contains all the utility functions for the application.
- api data response format:
```js
{
    "status": true,
    "message": "Task saved successfully!",
    "data": {
        "token": "xyz"
    },
}
```
- api error response format:
```js
{
    "status": false,
    "message": "error message",
    "error": {
        "some error": "xyz"
    },
}
```
- from every route either success or error response will be used provided in helper/methods.js, in case of error, error middleware will be used as all the errors are handled in the error middleware (centralized).
- Validation is done using `express-validator` and `joi`, before any route is hit, validation is done and if any error is found, express-vaidator is used to pluck out the error and send it to the user.
- logs are generated and stored in `logs` folder via use of logs middleware used in `server.js`
- any environment variables are stored in `.env` file and are validated and exported at `config.js`
- `config.js` contains all the configuration for the application.
- `server.js` is the entry point for the application.