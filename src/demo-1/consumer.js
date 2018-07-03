const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });

  const channel = await connection.createChannel();

  await channel.assertQueue('demo-1');

  channel.prefetch(1);

  channel.consume('demo-1', (msg) => {
    var message = msg.content.toString();
    console.log(`Receive message ${message}`);
    channel.ack(msg);
  });
}

process.on('SIGINT', () => process.exit(0));

main()
  .catch(console.error);



