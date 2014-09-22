#
# Craveysez Dockerfile
#

# Pull base image.
# FROM node:0.11.13-onbuild
FROM node:0.11.13

MAINTAINER Mike Cravey <techie@craveytrain.com>

# Give it a port to run on
EXPOSE 80

# Should match dir volume is mounted to for run
WORKDIR /usr/src/app

# Should "Just Work" if the server is named server.js
CMD [ "npm", "start" ]
