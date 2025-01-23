FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

EXPOSE 5050

CMD ["npm", "run", "dev"]
