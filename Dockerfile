FROM mcr.microsoft.com/playwright:v1.51.1-jammy
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm", "run", "test"]
