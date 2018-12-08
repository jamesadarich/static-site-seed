FROM node:10 as build

# Set build arguments
ARG SITE_DOMAIN

# Get required files
COPY . .

# Install app dependencies
RUN npm install

# Build app
RUN npm run build
RUN npm run build:gzip

FROM node:10-alpine

# Create build directory
RUN mkdir -p /${SITE_DOMAIN}
WORKDIR /${SITE_DOMAIN}

# Get files for production
COPY --from=build package.json .
COPY --from=build public public
COPY --from=build server server
RUN rm -rf server/**/*.ts

# Install production dependencies
RUN npm install --production

# Fire up the app
EXPOSE 80
CMD [ "npm", "start" ]
