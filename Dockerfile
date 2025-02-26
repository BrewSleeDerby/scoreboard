FROM node:23-alpine AS build

WORKDIR /app
COPY app/package.json ./
RUN npm install
COPY app/ ./
RUN npm run build

FROM nginx:1.27.4-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]