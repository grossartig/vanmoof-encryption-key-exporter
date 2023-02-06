FROM node:18-alpine

# RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
