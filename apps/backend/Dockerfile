FROM node:22-alpine

WORKDIR /usr/src

# COPY source destination
# COPY ./dist/index.js  ./index.js

COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate  

COPY . .



EXPOSE 5000

ENV DB_URL = "http://192.168.100"

CMD [ "node", "./dist/index.js" ]

#docker build -t image_tag dockerFilePath
#docker build -t node-sd-backend-server .

#process.evn.DB_PASS

#docker run -p 5000: 5000 -e DB_PASS="mysecretPass" node-sd-backend-server