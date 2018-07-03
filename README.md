# RabbitMQ Demo 

## Presentation

Slides [here](https://docs.google.com/presentation/d/1vrxtfwe0blZPswAdIayzIYucLZ9gWgesCgfrtphhfsg/edit?usp=sharing)

## Run RabbitMQ 

```sh
docker run -d -h my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Console management available here : http://localhost:15672 (guest / guest)

## Run the demo

- `nvm use`
- `npm i`
- `node src/demo-1/publisher.js`