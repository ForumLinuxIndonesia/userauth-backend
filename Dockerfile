FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node . .
RUN mkdir -p /app/logs && chown node:node logs && npm ci --only=production
USER node
CMD ["npm", "start"]
