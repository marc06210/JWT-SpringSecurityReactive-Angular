FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls /app/dist

FROM nginx
EXPOSE 4200
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN echo 'MGU'
RUN ls /usr/share/nginx/html
