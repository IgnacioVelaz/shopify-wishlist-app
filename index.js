import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import errorHandler from './errors/handler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://malachi-martial-test.myshopify.com'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); 
  } else {
    next();
  }
});

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', routes)
  .use(errorHandler)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
