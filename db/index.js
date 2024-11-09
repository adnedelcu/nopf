import mongoose from 'mongoose';

try {
  const options = {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
    dbName: process.env.MONGO_NAME,
  };

  await mongoose.connect(process.env.MONGO_URI, options);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection error: ', error);
  process.exit(1);
}
