import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('tickets', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to nats');

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);
  // 2nd parameter - queue group
  // event is sent to just one member of that queue group
  // for example we have 5 instances of service X and we don't want all of them to receieve the same event
  // we join all 5 to a queue group and only one of them will get the event
  // all other clients without a queue group get the event normally
  const subscription = stan.subscribe(
    'ticket:created',
    'listenerQueueGroup',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(
        `Received event #${msg.getSequence()}, with data: `,
        JSON.parse(data)
      );
    }

    msg.ack();
  });
});

process.on('SIGNIN', () => stan.close());
process.on('SIGTERM', () => stan.close());
