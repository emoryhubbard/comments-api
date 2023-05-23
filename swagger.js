const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Comments API by Emory Hubbard',
        description: 'A comments API for the Way of the Server tutorial site. It will provide for access to and storage of individual comments, as well as the associated user accounts.'
    },
    host: 'comments-api-2slc.onrender.com', // be sure to update to render (not localhost)!!!
    schemes: ['https'], // and to https, not http
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
