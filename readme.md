# Cravey Sez

My recomendations.

# Run

Assumes you have docker (and boot2docker if using an OS that doesn't support containers *ahem* OS X).

## Run redis docker container

```sh
docker run --name craveysez_redis -d redis
```

## Install node docker image

```sh
docker build -t craveysez/web .
```
## Run node docker container

You want to specify a port to expose this to on the host machine. In this case, boot2docker has exposed port 8080 to the host machine.

```sh
docker run -it -p 8080:80 craveysez/web
```


# To-Do

- hook up node and redis to store actual data
