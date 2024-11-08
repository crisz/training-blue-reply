FROM node:18
WORKDIR /app
COPY eventshub/package*.json ./
RUN npm install
COPY eventshub .

# Espone la porta usata da ng serve
EXPOSE 4200

# Comando per avviare l'app in modalità sviluppo con hot reload
RUN npm install -g @angular/cli
CMD ["ng", "serve", "--host", "0.0.0.0"]