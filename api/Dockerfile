FROM node:10 as base
ENV NODE_ENV=production
EXPOSE 4000
WORKDIR /api
COPY package*.json ./
RUN npm ci \ 
    && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
ENV PATH /api/node_modules/.bin:$PATH
EXPOSE 9229
RUN mkdir /api/app && chown -R node:node .
USER node
RUN npm i --only=development \
    && npm cache clean --force
RUN npm config ls -l
WORKDIR /api/app
CMD ["../node_modules/.bin/ts-node-dev","--inspect=0.0.0.0:9229","--respawn","--transpileOnly","./src/app.ts"]

FROM dev as test
COPY --chown=node:node . .
RUN npm audit

FROM test as build-stage
RUN npm run build

FROM base as prod
ARG backend
ARG frontend
ARG api_namespace
ENV REACT_APP_BACKEND=$backend
ENV REACT_APP_FRONTEND=$frontend
ENV API_NAMESPACE=$api_namespace
COPY --from=build-stage /api/app/dist /api/dist
CMD ["node", "./dist/src/app.js"]
