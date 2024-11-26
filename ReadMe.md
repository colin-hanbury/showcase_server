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
* Relatively fast
* Supports typescript (reduces likelyhood of bugs)
* Efficient at handling multiple requests
* Rich ecosystem (lots of libraries)

### MongoDb
* NoSQL database
* Horizontally scalable
* Quick to get up and running

### Docker
* containerisation
* easier to ship to cloud or onpremise

## Google Cloud
* Cloud Run
    * serverless
    * free at this scale
* Arifact Registry
    * easy deployment to cloud run

### Security
* Cors


## Architecture

* Portable
    * Containerised
    * Easy to ship 
* Separation of concerns
    * Dependency injection
    * Improved readability
* Open source
    * Not tied to a specific provider

## Future Improvements & Extensions

* Add some form of authorisation
    * Registration / login
    * JWT
    * Password hashing
* NGINX
    * Reverse proxy
    * Load balancing
* Tidy up
    * more consistent naming convention
    * more appropriately named endpoints
    * more testint and test cases