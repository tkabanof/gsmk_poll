FROM node:14-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#Справочно
#docker build . -t clientpoll
#docker run -p 8080:80 -d clientpoll
