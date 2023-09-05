FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]