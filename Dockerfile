FROM node:22.3.0
WORKDIR /app
COPY package.json .
RUN npm i 
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/app.js"]