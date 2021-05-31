import { createServer, RequestListener } from 'http';
import fetchPosts from './fetchPosts';
import fs from 'fs';
import createToken from './createToken';
import axios from 'axios';
import { setTimeout as sleep } from 'timers/promises';

const apiKey = process.env.API_KEY;
const baseURL = `http://ghost:2368/ghost/api/v3/admin`;

const token = createToken(apiKey);

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Ghost ${token}`,
  },
});

async function writePosts() {
  for (let i = 0; i < 10; i++) {
    try {
      const posts = await fetchPosts(client);
      const stringified = JSON.stringify(posts, null, 2);

      fs.writeFileSync('posts.json', stringified);
    } catch (err) {
      if (i === 9) console.error('Error getting posts');
      else await sleep(i * 100);
    }
  }
}

const handler: RequestListener = async function handler(_, res) {
  console.log('Rebuilding site');

  await writePosts();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Success' }));
};

const server = createServer(handler);
server.listen(80);
console.log('Listening for webhooks on 80');
writePosts();