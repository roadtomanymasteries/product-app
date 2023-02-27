## Author

- **Jay Shin**

# JB Hi Fi coding challenge

This project is an attempt to meet all the criterias set forth by the JB Hi Fi coding challenge. In summary, the challenge is to create a product management app that possesses CRUD functionalities, that is presented to the user via UI interface.

## Architecture

This project follows a 2 tier architecture. Due to the lack of complex business logic, it lacks a service layer.

## React

React was chosen to build the front end UI. In addition to being one of the most popular front end JavaScript libraries, its component-based architecture allows a user to create reusable elements, which minimises redundant code and makes it easier to build and maintain.

## Auth0

Auth0 was chosen as the authentication platform, as it makes it easy to integrate with existing projects. Furthermore, it provides various security features such as threat detection and anomaly detection features, as well as numerous customisation options which are presented on the platform in a easy to understand UI.

## Infrastructure

The process of deployment to the cloud would involve: React code being compiled and pushed to S3(AWS/or Azure equivalent), and the files would be served by Cloudfront. The server will be compiled, and deployed to a Lambda Function (or Azure equivalent) which sits behind an API gateway where configs such as CORS would be applied.

## Deployment

The app and server repositories are deployment ready. For variables that change depending on the runtime environment, they are defined as environment variables, which in this case reside in the .env files. The server is also setup for local development and deployment, by abstracting the Express app in the app.ts file which is then imported into local.ts and index.ts for local development and deployment to AWS respectively.

## Testing

Integration and E2E testing was achieved via Cypress. The lack of complex logic involved in this project did not (in my opinion) warrant unit tests, hence, the aforementioned option was chosen to test the overall functionalities from start to finish. As such, supertest is used to test the API endpoints and Cypress is used for E2E testing.

## Project Repositories

The Project consists of two repositories; product-app and product-server. You can clone the repositories via the below links:

- [product-app repository](https://github.com/roadtomanymasteries/product-app)
- [product-server repository](https://github.com/roadtomanymasteries/product-server)

Install dependencies via running the following command for each repositories

```
npm install
```

## Running Front End (product-app repo)

In order to spin up front end, run the following command

```
npm run dev
```

## Running Back End (product-server repo)

In order to spin up the server, run the following command

```
npm run dev
```

## Running Cypress tests

In order to run the front end E2E tests, run the following command

```
npm run cy:test

```

## Running Supertest tests

In order to run the back end tests for the API, run the following command

```
npm run test
```

## Challenges

### No Database

Having no database came with its challenges. Seeding for tests had to involve unconventional methods as workarounds. As an example, an endpoint for reseeding the data was created specifically for this purpose. In real world cases where a database has been implemented, a database driver would be installed which would connect to the database directly.

## Role-based Access Control

Currently, there is no implemented role-based access control due to time constraint. Thus, the app works under the premise that only those who can manage products have credentials to login e.g) administrators.

Role-based access control (RBAC) is a security method where access to resources is based on the user's role or job function. Users are assigned roles and permissions are granted to each role. This simplifies access management and ensures users have only the necessary permissions to do their job. RBAC is widely used and is considered a best practice for access management.
