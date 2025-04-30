FROM node:current-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
RUN mkdir -p /usr/src/app/node_modules/.cache && chown -R 1000:1000 /usr/src/app/node_modules/.cache
CMD ["npm", "start"]
