export function updateEvents(state, payload) {
  return {
    ...state,
    event: {
      ...state.event,
      ...payload,
    },
  };
}

export function clearEvents(state, payload) {
  return {
    ...state,
    event: {},
  };
}
