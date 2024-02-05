FROM node:latest
# Set the working directory
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /home/node/app
# Before switching to user 'node', ensure the directory exists and has the correct permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Copying with chown in a single line before npm install to avoid permission issues.
COPY --chown=node:node . .
# Install dependencies
RUN npm install
# Expose ports
EXPOSE 5099 
EXPOSE 13337 
RUN chmod -R 777 /home/node/
USER node
ENV NODE_ENV production

CMD [ "npm", "start" ]