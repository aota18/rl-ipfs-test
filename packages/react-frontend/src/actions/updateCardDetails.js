export function updateCardDetails(state, payload) {
  return {
    ...state,
    cardInfo: {
      ...state.cardInfo,
      ...payload,
    },
  };
}

export function clearCardDetails(state, payload) {
  return {
    ...state,
    cardInfo: {},
  };
}
