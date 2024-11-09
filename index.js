import './db/index.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error-handler.js';
import auth from './routers/auth.js';
import users from './routers/users.js';
import properties from './routers/properties.js';
import dependencyInjection from './middleware/dependency-injection.js';
import tokenValidator from './middleware/token-validator.js';
import Property, { PropertySchema } from './models/property.js';
import { faker } from '@faker-js/faker';

if (!Property.findOne()) {
  const enums = PropertySchema.tree.type.enum;
  for (let i = 0; i < 100; i++) {
    console.log(`Creating fake location ${i+1}`);
    const images = [];
    for (let j = 0; j < faker.number.int({ max: 5 }); j++) {
      images.push(faker.image.url());
    }
    const location = new Property({
      title: faker.company.name(),
      description: faker.lorem.sentence(),
      price: faker.number.float(),
      type: enums[Math.floor(Math.random() * 3)],
      images: images,
      location: {
        type: 'Point',
        coordinates: [
          faker.location.longitude(),
          faker.location.latitude(),
        ],
      },
    });
    await location.save();
    console.log(`Saved fake location ${i+1}`);
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(tokenValidator);

app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/auth', auth);
app.use('/users', tokenValidator, users);
app.use('/properties', tokenValidator, properties);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
