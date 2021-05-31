FROM node:16-alpine3.11

COPY package*.json ./
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm install --quiet

USER node

WORKDIR /home/node

COPY . .

# ENTRYPOINT ["/sbin/tini", "--"]

CMD [ "npm", "start" ]
