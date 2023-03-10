import requests from './httpService';

const SbtServices = {
  createSbt(body) {
    return requests.post('/sbt', body);
  },

  getMySbts() {
    return requests.get('/sbt');
  },

  mintSbt({ id, tokenId }) {
    return requests.patch(`/sbt/mint/${id}`, { tokenId });
  },

  burnSbt({ id }) {
    return requests.patch(`/sbt/burn/${id}`);
  },
};

export default SbtServices;
