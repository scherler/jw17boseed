FROM node:slim
RUN apt-get -qq update && apt-get -qq -y install bzip2
RUN mkdir /bluebook
COPY ./ /bluebook
WORKDIR /bluebook

RUN npm install
RUN npm run bundle

CMD npm start

EXPOSE 9009

