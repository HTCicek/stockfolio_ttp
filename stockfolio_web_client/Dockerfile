FROM node:14.1.0-alpine as builder

WORKDIR /app
COPY . /app
RUN yarn install --silent

RUN yarn build

FROM nginx:1.19.2-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
