import { createServer, RequestListener } from 'http';
import fetchPosts from './fetchPosts';
import fs from 'fs';
import createToken from './createToken';
import axios from 'axios';

const apiKey = '60b2b67558ff3300016f3d85:71f1b62b09d510462c002dd02ad68f0a742d0da7dd30c669a043b35c676489bd';
const baseURL = `http://ghost:2368/ghost/api/v3/admin`;

const token = createToken(apiKey);

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Ghost ${token}`,
  },
});

async function writePosts() {
  const posts = await fetchPosts(client);
  const stringified = JSON.stringify(posts, null, 2);

  fs.writeFileSync('posts.json', stringified);
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
setTimeout(() => writePosts(), 2000);
