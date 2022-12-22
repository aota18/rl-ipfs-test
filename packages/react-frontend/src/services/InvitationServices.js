import requests from "./httpService";

const InvitationServices = {
  createInvitation(createInvitationInput) {
    return requests.post("/invitations", createInvitationInput);
  },
  getAllInvitations({ page, limit }) {
    return requests.get(`/invitations?page=${page}&limit=${limit}`);
  },

  requestApproval({ id, eventId, password }) {
    return requests.patch(`/invitations/${id}`, { eventId, password });
  },
};

export default InvitationServices;
