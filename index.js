import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();
const headers = {
  'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:84.0) Gecko/20100101 Firefox/84.0",
  'X-Forwarded-For': "cheesemoose"
}



//begin server configs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/halflife', (req, res) => {
  res.render('halflife');
});

app.get('/doom', (req, res) => {
  res.render('doom');
});

app.get('/slope', (req, res) => {
  res.render('slope');
});

app.get('/geometry_dash', (req, res) => {
  res.render('geometry_dash');
});

app.listen(port, async () => {


  console.log(`Server started on port ${port}`);
});
//https://wai.137900.xyz/search?q=test