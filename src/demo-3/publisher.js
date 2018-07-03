const amqp = require('amqplib');
const logs = require('./logs');

async function main() {
  const connection = await amqp.connect('amqp://localhost:5672', { heartbeat: 10 });
  
  const channel = await connection.createChannel();

  await channel.assertExchange('demo-3-exchange', 'topic');

  logs.forEach((log) => {
    channel.publish('demo-3-exchange', log.level, Buffer.from(log.msg));
  });

  await channel.close();
}

process.on('SIGINT', () => process.exit(0));

main()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch(console.error);



