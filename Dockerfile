FROM node:25-alpine AS build
  
USER node

WORKDIR /app
COPY . ./
RUN npm ci --quiet
RUN npm run build-docker --quiet

FROM nginx:1.29.8-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD wget --quiet --tries=1 --spider http://127.0.0.1:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]