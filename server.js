const express = require('express');
const app = express();
const moment = require('moment');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const v1 = require('./api/v1/routes/index');
const errorMiddleware = require('./middlewares/error.middleware');
const accessLogMiddleware = require('./middlewares/logger.middleware');
const multerError = require('./middlewares/multerError.middleware');
const devOnly = require('./middlewares/devOnly');
const { port, env, public } = require('./config/config');
const { connectDB } = require('./config/db.connection');


app.use(compression()); // To compress the response bodies.
app.use(cors()); // To enable CORS, configure to only allow requests from certain origins.
app.use(express.json()); // To parse the incoming requests with JSON payloads.
app.use(multerError); // To handle multer errors.
app.use(accessLogMiddleware); // Req and Res logger.
app.use(cookieParser()); // To parse cookies in the request.
app.use(express.static(public.buildDir)); // To serve the static files from the build folder.
app.use(helmet()); // To secure the app by setting various HTTP headers


app.use('/v1', v1);
app.get('*', (_, res) => res.sendFile(public.buildIndex));


app.use(errorMiddleware); // Logs every error


app.listen(port, async () => {
    const conn = await connectDB();
    console.log('DB connected    ', conn.connection.host);
    console.log('Node environment', env.isDevelopment ? 'Development' : 'Production');
    console.log('Start time      ', moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
    console.log('running at      ', `http://localhost:${port}`);
    console.log('Server has started successfully');
});
