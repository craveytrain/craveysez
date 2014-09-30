# Cravey Sez

My recomendations.

Note: I'm not using redis right now, so I've commented it out of the process. For now, I have stub data and I'm simply storing it in memory.

# Run

Assumes you have [docker](https://www.docker.com/) (and [boot2docker](https://github.com/boot2docker/boot2docker) or [docker-osx](https://github.com/noplay/docker-osx) if using an OS that doesn't support containers *ahem* OS X) and [fig](http://www.fig.sh/).

## Run node docker container

Fig abstracts away the the mess of the docker run command.

```sh
fig up
```


# To-Do

- hook up node and redis to store actual data
