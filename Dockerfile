FROM node:16-alpine

WORKDIR /app
COPY . /app
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000
