# Angular
FROM node:14.17.0-alpine as builder
WORKDIR /home/frontend
COPY ./package.json  /home/frontend
RUN npm install
COPY ./ /home/frontend
COPY src /home/frontend/src
RUN npm run build --output-path=./dist/frontend --prod

# Nginx
FROM nginx:alpine
# name in package.json
COPY --from=builder /home/frontend/dist/shoppingcart /usr/share/nginx/html
# EXPOSE 4200:80