import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();
const headers = {
  'User-Agent': "Mozilla/5.0 (Macintosh Intel Mac OS X 10.15 rv:84.0) Gecko/20100101 Firefox/84.0",
  'X-Forwarded-For': "cheesemoose"
};
const title = 'Goombing Games';
//Mapping game routes/titles to urls, so that I can dynamically assign routes
const urlMap = {
  '1v1-lol': 'https://topvazstore.github.io/g/1v1-lol',
  'doom': 'https://raz0red.github.io/webprboom/',
  'half-life': 'https://pixelsuft.github.io/hl/xash.html#150',
  'moto-x3m-winter': 'https://topvazstore.github.io/g/moto-x3m-winter',
  'moto-x3m': 'https://topvazstore.github.io/g/moto-x3m',
  'password-game': 'https://neal.fun/password-game/',
  'quake': 'https://netquake.io',
  'realmz': 'https://erth2.party/',
  'slope': 'https://slope-p0syd0n.vercel.app/',
  'apple-worm': 'https://topvazstore.github.io/g/apple-worm/',
  'awesome-tanks-2': 'https://topvazstore.github.io/g/awesome-tanks-2',
  '3d-car-simulator': 'https://topvazstore.github.io/g2/3d-car-simulator',
  'bloxd': 'https://bloxd.io',
  'run3': 'https://run3.io/',
  'snow-rider': 'https://slope-game.github.io/snow-rider-3d.htmlhttps://html5.gamedistribution.com/3b79a8537ebc414fb4f9672a9b8c68c8/',//this fix game get html
  'idle-breakout': 'https://valana.online/idle-breakout-unblocked/',
  'crossy-road': 'https://crossyroad.netlify.app/',
  'elephant': 'https://mountain658.github.io/thisistheonlylevel.html',
  'sand-game': 'https://boredhumans.com/falling_sand/',
  'spelunky': 'https://yancharkin.github.io/SpelunkyClassicHDhtml5/'
  
};
//Same thing but with games I have the source code for
const sourceMap = {
  'geometry-dash': 'geometry-dash',
  'sandboxels': 'sandboxels'
};

//begin server configs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//static routes
app.get('/', (req, res) => {
  res.render('main', {title: title});
})

app.get('/games', (req, res) => {
  res.render('games', {urlMap: urlMap, sourceMap: sourceMap, title: title});
})

app.get('/support', (req, res) => {
  res.render('support', {title: title});
})

app.get('/chat', (req, res) => {
  res.render('iframe-template', {url: 'https://atlantic.adaptable.app', title: 'Atlantic Chat'});
})

//rendering the games that use iframes
for (const [key, value] of Object.entries(urlMap)) {
  app.get(`/${key}`, (req, res) => {
    res.render('iframe-template', { url: value , title: title+': '+key});
  });
};

//rendering the locally hosted games
for (const [key, value] of Object.entries(sourceMap)) {
  app.get(`/${key}`, (req, res) => {
    res.render(value);
  });
};

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
//https://wai.137900.xyz/search?q=test

