export function updateInvites(state, payload) {
  return {
    ...state,
    invites: {
      ...state.invites,
      ...payload,
    },
  };
}

export function clearInvites(state, payload) {
  return {
    ...state,
    invites: {},
  };
}
