FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD ["npm", "start"]
