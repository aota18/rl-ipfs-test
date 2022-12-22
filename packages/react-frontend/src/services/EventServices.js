import requests from "./httpService";

const EventServices = {
  createEvent(body) {
    return requests.post("/events", body);
  },

  getAllEvents({ page, limit }) {
    return requests.get(`/events?page=${page}&limit=${limit}`);
  },

  getSingleEvent(eventId) {
    return requests.get(`/events/${eventId}`);
  },
};

export default EventServices;
