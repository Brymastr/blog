FROM node:16-alpine3.11

WORKDIR /home/node

COPY *.json ./

RUN npm set progress=false && \
  npm config set depth 0 && \
  npm install --quiet

COPY *.ts ./

USER node

CMD [ "npm", "start" ]
