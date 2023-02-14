import { getQueryString } from '../utils/string';
import requests from './httpService';

const EventServices = {
  createEvent(body) {
    return requests.post('/events', body);
  },

  getAllEvents(options) {
    let queryString = getQueryString(options);
    return requests.get(`/events${queryString}`);
  },

  getMyEvents({ page, limit }) {
    return requests.get(`/events/myevents?page=${page}&limit=${limit}`);
  },

  getSingleEvent(eventId) {
    return requests.get(`/events/${eventId}`);
  },
};

export default EventServices;
