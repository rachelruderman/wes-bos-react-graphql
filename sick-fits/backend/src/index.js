require('dotenv').config({path: 'variables.env'});
const jwt           = require('jsonwebtoken');
const cookieParser  = require('cookie-parser');
const createServer  = require('./createServer');
const db            = require('./db');

const server        = createServer();

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// Decode the JWT so we can get the current user
server.express.use((request, response, next) => {
    const {token} = request.cookies;
    if(token){
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        // PUT THE USER ID ONTO TEH REQUEST FOR FUTURE Requests to access
        request.userId = userId;
    }
    next();
});

//Only allow our site to access it
server.start({
    cors: {
        credentials:    true,
        origin:         process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server is now running on port
    http://localhost:${deets.port}`)
});