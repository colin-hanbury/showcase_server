npm init

npm i express dotenv 

npm i -D typescript @types/express @types/node

npx tsc --init    

npx ts-node src/index.ts

npm i -D nodemon ts-node concurrently

npm i cors

npm install mongodb mongoose

npm install ts-node swagger-autogen swagger-ui-express express @types/express @types/swagger-ui-express


npm run dev   

# showcase_server

Server to document and implement apis for showcase app

## Local Deployment

- npm i
- npm run dev
- 


## AWS deployment

- aquire access token
    -
- docker build . -t showcase_server
- docker run -p 8080:8080 showcase_server
- docker tag showcase_server <aws-repo-path>
- docker push <aws-repo-path>
