FROM node:16-alpine

COPY package.json .
COPY yarn.lock .
RUN yarn install --production=true

COPY . .

CMD ["yarn", "start"]