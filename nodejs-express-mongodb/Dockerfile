FROM node:20-alpine

RUN adduser -D myuser

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


USER myuser

ENV PORT 8081

EXPOSE ${PORT}

CMD ["npm", "run" ,"server"]