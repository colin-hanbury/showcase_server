# Showcase Server

Server to document and implement apis for showcase app

## Get Started

### Locally

#### Database

* Install mongosh
    * https://www.mongodb.com/docs/mongodb-shell/install/
* Pull down the docker image of Mongodb
    * MongoDB community Edition




#### Node

* Add the following env variable to your local .env file
    * ATLAS_URI=mongodb://localhost:27017/localv2
* npm i
* npm run dev

##### Optional (Run docker locally)
* docker build . -t showcase-server
* docker run -p 8080:8080 -e ATLAS_URI=mongodb://localhost:27017/localv2 showcase-server



## Tech

### NodeJs (TypeScript)

* The classic
    * Lots of libraries and support abvailable
    * familiar to me
* Somewhat lightweight
* Decent errorhandling capabilities
* easy to plug-in with backend

### MongoDb

* Quick to build
* Easy to deploy locally or in cloud environments
* Can be scaled easily horizontally
* Not as clean however Mongoose aids us with this

### Docker

## Google Cloud
* Serverless
    * Quick and easy deplyment 
* Used Google Cloud functions instead of AWS lambdas
    * Had an issue with AWS verifying my identity for the free trial

### Security
* Cors


## Architecture

* Portable
    * Containerised
    * Easy to ship 
* Separation of concerns
    * Readability
    * Clean
    * Facilitates easier collaboration for developers 
* Open source
    * Not tied to a specific provider

## Future Improvements & Extensions

* Add some form of authorisation
    * Registration / login
    * JWT
    * Password hashing
    * SSL certs
    * Admin apis for modifying backend data that shouldn't be available to modify by the public
* NGINX
    * Reverse proxy
    * Load balancing
* Limiters on query results
