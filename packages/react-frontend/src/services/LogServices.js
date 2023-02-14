import requests from './httpService';

const LogServices = {
  getTicketLogs({ page, limit }) {
    return requests.get(`/log?page=${page}&limit=${limit}`);
  },
};

export default LogServices;
