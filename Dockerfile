#
# Craveysez Dockerfile
#

# Pull base image.
FROM ubuntu:latest

MAINTAINER Mike Cravey <techie@craveytrain.com>

# Update & upgrade
RUN apt-get -q update
RUN apt-get -q upgrade

# Install necessary software
RUN apt-get install -qy nodejs redis-server

# Give it a port to run on
EXPOSE 80

# # Define working directory.
WORKDIR /opt/craveysez

# Run Redis
CMD redis-server /etc/redis/redis.conf && nodejs app.js
