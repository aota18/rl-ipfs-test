import requests from "./httpService";

const GreetingServices = {
  createGreeting(createGreetingInput) {
    return requests.post("/greeting", createGreetingInput);
  },
  getAllReceivedGreetings(id, { page, limit }) {
    return requests.get(`/greeting?page=${page}&limit=${limit}&to=${id}`);
  },
  getAllSentGreetings(id, { page, limit }) {
    return requests.get(`/greeting?page=${page}&limit=${limit}&from=${id}`);
  },
};

export default GreetingServices;
