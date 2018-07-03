const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });
  
  const channel = await connection.createChannel();

  await channel.assertQueue('demo-1');

  channel.sendToQueue('demo-1', Buffer.from(`Hello, message n°${Math.round(Math.random() * 100)} !`));

  await channel.close();
}

process.on('SIGINT', () => process.exit(0));

main()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch(console.error);
