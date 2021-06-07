# blog

## Initial deploy (per environment)

```sh
$ sam build
$ sam deploy --guided
```

## Editing Posts (with Ghost and Docker)

Posts are stored in a file called `posts.json`. That file is an adaptation of the Ghost cms posts export file since this blog was originally a Ghost blog. You can utilize the actual Ghost editor by spinning up an instance of Ghost in Docker and then exporting the written posts to json via the API. To start editing with the Ghost editor run `npm run editor`. Upon creating/editing/publishing/deleting a post a new version of the posts.json file will be available to the website.
