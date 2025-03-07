FROM node:18-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build --omit=dev

FROM nginx:alpine AS ngi

COPY --from=build /dist/src/app/dist/client/browser  /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

