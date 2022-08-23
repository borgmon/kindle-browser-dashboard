FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8100
ENTRYPOINT [ "npm", "start" ]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
