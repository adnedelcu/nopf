import './db/index.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error-handler.js';
import auth from './routers/auth.js';
import users from './routers/users.js';
import properties from './routers/properties.js';
import dependencyInjection from './middleware/dependency-injection.js';
import tokenValidator from './middleware/token-validator.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(tokenValidator);

app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/auth', auth);
app.use('/users', users);
app.use('/properties', dependencyInjection, properties);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
