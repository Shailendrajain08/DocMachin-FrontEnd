#FROM alpine as node
#RUN apk add --update nodejs npm
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run prod

# stage 2
FROM nginx:alpine
COPY /dist/dm-frontend /usr/share/nginx/html
COPY /.nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
