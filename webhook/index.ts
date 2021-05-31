import { createServer, RequestListener } from 'http';
import fetchPosts from './fetchPosts';
import fs from 'fs';
import createToken from './createToken';
import axios from 'axios';
import { Post } from './types';

const baseURL = `http://ghost:2368/ghost/api/v3/admin`;
const apiKey = process.env.API_KEY;

const token = createToken(apiKey);
console.log(token);

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Ghost ${token}`,
  },
});

async function writePosts(posts: Post[]) {
  const stringified = JSON.stringify(posts, null, 2);
  fs.writeFileSync('posts.json', stringified);
}

const handler: RequestListener = async function handler(_, res) {
  console.log('Rebuilding site');

  const posts = await fetchPosts(client);
  await writePosts(posts);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Success' }));
};

async function main() {
  const posts = await fetchPosts(client);
  await writePosts(posts);

  const server = createServer(handler);
  server.listen(80);

  console.log('Listening for webhooks on 80');
}
main();
