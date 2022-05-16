FROM node:alpine
WORKDIR /vehicle-project
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]