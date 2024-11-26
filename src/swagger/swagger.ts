import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Adapptor Demo API Server',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: ''
        },
    ],
    components: {
    }
};

const outputFile = './swagger_output.json';
// const endpointsFiles = ['/actions', 'welcome'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, doc);