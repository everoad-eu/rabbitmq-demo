const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });
  
  const channel = await connection.createChannel();

  await channel.assertExchange('demo-2-exchange', 'fanout');

  channel.publish('demo-2-exchange', '', Buffer.from(`Hello message n°${Math.round(Math.random() * 100)} !`));

  await channel.close();
}

process.on('SIGINT', () => process.exit(0));

main()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch(console.error);



