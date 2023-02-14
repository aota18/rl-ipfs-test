import { getQueryString } from '../utils/string';
import requests from './httpService';

const TicketServices = {
  getAllTickets(options) {
    let queryString = getQueryString(options);
    return requests.get(`/ticket${queryString}`);
  },

  createTicket(eventId) {
    return requests.post(`/ticket`, { eventId });
  },

  getTicketAttendees(eventId, options) {
    let queryString = getQueryString(options);
    return requests.get(`/ticket/attendees/${eventId}${queryString}`);
  },

  getTicketHolders(eventId) {
    return requests.get(`/ticket/holders/${eventId}`);
  },

  approveRequest(ticketId) {
    return requests.patch(`/ticket/request/${ticketId}`);
  },

  verify(ticketId) {
    return requests.patch(`/ticket/verify/${ticketId}`);
  },

  getTicketInfo(ticketId) {
    return requests.get(`/ticket/${ticketId}`);
  },
};

export default TicketServices;
