FROM node:20.13.1

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

#EXPOSE 5173

CMD [ "yarn", "dev" ]