# Этап сборки
FROM node:20 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Этап запуска
FROM nginx:alpine

# Копируем собранные файлы фронтенда в Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурацию Nginx (если нужно)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]