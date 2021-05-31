FROM node:16-alpine3.11

RUN mkdir posts && chown node:node posts

WORKDIR /home/node

COPY *.json ./

RUN npm set progress=false && \
  npm config set depth 0 && \
  npm install --quiet


USER node

COPY *.ts ./

CMD [ "npm", "start" ]
