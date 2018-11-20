
FROM node:8.0.0
MAINTAINER Joe

ADD web /runDIR/web
#ADD files/web/src /tmp/build/web/page

WORKDIR /runDIR/web

RUN cd /runDIR/web && npm install

RUN mkdir -p /usr/local/share/upload

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000
ENTRYPOINT ["npm","start"]

