FROM node:12.18.1-alpine as builder
WORKDIR /app
COPY src ./src
COPY package*json ./
COPY public ./public
RUN npm install
ENV GENERATE_SOURCEMAP false
RUN npm run build

FROM nginx:1.12-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html/
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
RUN chmod +x env.sh
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
