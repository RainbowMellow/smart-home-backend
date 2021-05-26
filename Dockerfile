FROM nginx

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
