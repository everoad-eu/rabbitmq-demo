const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });
  
  const channel = await connection.createChannel();
  
  await channel.assertExchange('demo-3-exchange', 'topic');

  channel.prefetch(1);

  await channel.assertQueue('demo-3-error');

  await channel.bindQueue('demo-3-error', 'demo-3-exchange', 'error');

  channel.consume('demo-3-error', (msg) => {
    var message = msg.content.toString();
    console.log(`Receive error message ${message}`);
  }, { noAck: true });
}

process.on('SIGINT', () => process.exit(0));

main()
  .catch(console.error);



