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
const title = 'Goombing Games'
const urlMap = {'1v1-lol': 'https://topvazstore.github.io/g/1v1-lol', 'bomb-it-7': 'https://topvazstore.github.io/g/bomb-it-7', 'doom': 'https://raz0red.github.io/webprboom/', 'half-life': 'https://pixelsuft.github.io/hl/xash.html#150', 'moto-x3m-winter': 'https://topvazstore.github.io/g/moto-x3m-winter', 'moto-x3m': 'https://topvazstore.github.io/g/moto-x3m', 'password-game': 'https://neal.fun/password-game/', 'quake': 'https://netquake.io', 'realmz': 'https://erth2.party/', 'slope': 'https://slope-p0syd0n.vercel.app/'}

const sourceMap = {'geometry-dash': 'geometry-dash'}

//begin server configs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('main', {urlMap: urlMap, sourceMap: sourceMap});
});

for (const [key, value] of Object.entries(urlMap)) {
  app.get(`/${key}`, (req, res) => {
    res.render('iframe-template', { url: value , title: title+': '+key});
  });
}

for (const [key, value] of Object.entries(sourceMap)) {
  app.get(`/${key}`, (req, res) => {
    res.render(value);
  });
}

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
//https://wai.137900.xyz/search?q=test