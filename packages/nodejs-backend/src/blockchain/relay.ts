import { Relayer } from 'defender-relay-client';

const sendRelay = async (tx) => {
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_API_SECRET,
  };
  const relayer = new Relayer(credentials);
  console.log(relayer);
  await relayer.sendTransaction(tx);
};

export default sendRelay;
