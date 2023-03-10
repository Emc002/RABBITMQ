const amqp = require('amqplib');

const exchange = "topicLogs";
const args = process.argv.slice(2);
const msg = args[1] || "Hello WOrld";
const key = args[0]

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange,'topic',{durable: false});
  channel.publish(exchange, key, Buffer.from(msg));
  console.log(`Sent SuccesFully ${msg}`)
  setTimeout(()=> {
    connection.close();
    process.exit(0)
  }, 500)
}

sendMsg()

