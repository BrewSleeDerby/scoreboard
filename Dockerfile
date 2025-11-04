FROM node:25-alpine AS build
  
USER node

WORKDIR /app
COPY app/ ./
RUN npm ci --quiet
RUN npm run build --quiet

FROM nginx:1.29.3-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD wget --quiet --tries=1 --spider http://127.0.0.1:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]