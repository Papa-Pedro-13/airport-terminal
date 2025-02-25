# Используем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт, на котором работает приложение
EXPOSE 5000

# Команда для запуска приложения
CMD ["node", "server.js"]