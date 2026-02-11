FROM node:22-alpine

# WORKDIR  containerInDockerHub    (root/OJ_backend)
WORKDIR /OJ_backend

RUN apk update && apk add --no-cache g++

# COPY local containerInDockerHub  ====> COPY .(local) .(WORKDIR)

COPY . /OJ_backend   

RUN npm install

EXPOSE 3000

# command to run your project 
CMD ["node","app.js"]