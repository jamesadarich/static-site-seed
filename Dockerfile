FROM node:8

MAINTAINER jamesrichford@googlemail.com

# Use site domain as app folder or default to "app"
ARG SITE_FOLDER=/${SITE_DOMAIN:-app}

# Create build directory
RUN mkdir -p ${SITE_FOLDER}
WORKDIR ${SITE_FOLDER}

# Get required files
COPY gatsby-*.* ${SITE_FOLDER}/
COPY server ${SITE_FOLDER}/server
COPY src ${SITE_FOLDER}/src
COPY package.json ${SITE_FOLDER}/
COPY tsconfig.json ${SITE_FOLDER}/

# Install app dependencies
RUN npm install

# Patch old dependency
# Should be removed when upgrading to gatsby 2
# https://github.com/jamesrichford/static-site-seed/issues/25
RUN npm run patch:extract-text-plugin 

# Build app
RUN npm run build

# Tidy up
RUN rm -rf .cache
RUN rm -rf src
RUN rm -rf server/**/*.ts
RUN rm -rf gatsby-*.*
RUN rm -rf package-lock.json
RUN rm -rf tsconfig.json

# Fire up the app
EXPOSE 8080
CMD [ "npm", "start" ]
