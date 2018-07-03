const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });
  
  const channel = await connection.createChannel();
  
  await channel.assertExchange('demo-2-exchange', 'fanout');

  channel.prefetch(1);

  await channel.assertQueue('demo-2-2');

  await channel.bindQueue('demo-2-2', 'demo-2-exchange', '');

  channel.consume('demo-2-2', (msg) => {
    var message = msg.content.toString();
    console.log(`Receive 2 message ${message}`);
    channel.ack(msg);
  });
}

process.on('SIGINT', () => process.exit(0));

main()
  .catch(console.error);



