
# Image de developpement du backend GreenRoots
FROM node:24-alpine

WORKDIR /app

# Installation des dependances (--ignore-scripts : on genere le client Prisma plus tard)
COPY package*.json ./
RUN npm install --ignore-scripts

# Code source
COPY . .

EXPOSE 3001

# Au demarrage : generer le client Prisma puis lancer le serveur en mode dev.
# (la generation se fait ici pour fonctionner avec le volume monte par docker-compose)
CMD ["sh", "-c", "npx prisma generate && npm run dev"]
