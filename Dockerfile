# Definindo a imagem base
FROM node:18-alpine

# Instala o Python antes de instalar as dependências
RUN apk add --no-cache python3 py3-pip build-base

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o código da aplicação para dentro do container
COPY . .

# Expondo a porta que o app vai rodar (ajuste conforme necessário)
EXPOSE 3000

# Rodando as migrações do Prisma
RUN npx prisma generate

# Comando para rodar a aplicação
CMD ["sh", "-c", "python /app/teste.py && npx prisma generate && npx prisma migrate deploy && npm start"]

