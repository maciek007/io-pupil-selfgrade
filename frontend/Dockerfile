FROM node:20.13.1

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker build -t react-docker . - to build the image
# docker run -p 3000:3000 react-docker - to run the image