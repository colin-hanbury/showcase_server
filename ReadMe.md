# Showcase Server

Server to document and implement apis for showcase app

## Get Started

### Locally

* Pull down git repo:
    git pull https://github.com/colin-hanbury/showcase_server

* Start up docker engine
    * Open Docker Desktop on PC or Mac
    * https://docs.docker.com/desktop/


* Build and run server and db
    * Execute the following cmd in the root dir of the project you pulled down:
    docker compose up

* Verify locally with 200 response and welcome message:
    http://localhost:8080/welcome


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