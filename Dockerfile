
FROM node:8.0.0
MAINTAINER Joe

RUN mkdir -p /runDIR

ADD web /runDIR/web


RUN cd /runDIR/web && pwd && npm install && npm build


RUN mkdir -p /usr/local/share/upload

WORKDIR /runDIR/web

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000
ENTRYPOINT ["npm","start"]
