import { createServer, RequestListener } from 'http';
import fetchPosts from './fetchPosts';
import fs from 'fs';
import createToken from './createToken';
import axios from 'axios';
import { setTimeout as sleep } from 'timers/promises';

const apiKey = process.env.API_KEY;
const baseURL = `http://ghost:2368/ghost/api/v3/admin`;

const token = createToken(apiKey);
console.log(token);

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Ghost ${token}`,
  },
});

async function writePosts() {
  const maxAttempts = 20;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const posts = await fetchPosts(client);
      const stringified = JSON.stringify(posts, null, 2);
      // fs.writeFileSync('posts.json', stringified);
      fs.writeFileSync('posts.json', 'random text to put in the file');
      break;
    } catch (err) {
      if (i >= maxAttempts - 1) console.error('Error getting posts');
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

async function main() {
  await writePosts();
  const server = createServer(handler);
  server.listen(80);
  console.log('Listening for webhooks on 80');
}
main();
