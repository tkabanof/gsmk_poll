FROM node:14
WORKDIR /app
#COPY --from=builder /app/dist /app
COPY package.json /app/package.json
#RUN npm install --only=prod
RUN npm install
COPY . .
EXPOSE 7000
#USER node
CMD ["node", "index.js"]