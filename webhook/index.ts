import { createServer, RequestListener } from 'http';
import fetchPosts from './fetchPosts';
import fs from 'fs';
import createToken from './createToken';
import axios, { AxiosInstance } from 'axios';
import { Post } from './types';

const baseURL = `http://ghost:2368/ghost/api/v3/admin`;
const apiKey = process.env.API_KEY;

let client: AxiosInstance;

function createClient() {
  const token = createToken(apiKey);
  console.log(token);

  const newClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Ghost ${token}`,
    },
  });

  return newClient;
}

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
  client = createClient();

  const posts = await fetchPosts(client);
  await writePosts(posts);

  setInterval(() => {
    client = createClient();
  }, 4 * 60 * 1000);

  const server = createServer(handler);
  server.listen(80);

  console.log('Listening for webhooks on 80');
}
main();
