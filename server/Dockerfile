FROM node:14-alpine
WORKDIR /app
#COPY --from=builder /app/dist /app
COPY package.json /app/package.json
#RUN npm install --only=prod
RUN npm install
COPY . .
EXPOSE 7000
#USER node
CMD ["node", "index.js"]

#docker build . -t serverpoll
#СПРАВОЧНО -t - значит присвоить тег (кароче так он будет называтся)

#docker run -p 49160:7000 -d serverpoll
# -p 49160:7000 - значит что контейнер булет отвечать на порту 49160 (нпример для запросов чере постман)
# так как в переменной por в env мы указали порт 7000 то все запросы
# на внешний порт 49160 будут направлятся на внутренний порт 7000

# -d означает что запустить контейнер следует независимо (иначе контейнер запустится в консоле и будет привязан к терминалу)

