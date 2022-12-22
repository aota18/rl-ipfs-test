export function updateSignupInfo(state, payload) {
  return {
    ...state,
    signupInfo: {
      ...state.signupInfo,
      ...payload,
    },
  };
}

export function clearSignupInfo(state, payload) {
  return {
    ...state,
    signupInfo: {},
  };
}
