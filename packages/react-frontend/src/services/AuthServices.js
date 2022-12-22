import requests from "./httpService";

const AuthServices = {
  login(body) {
    return requests.post("/auth/login", body);
  },

  signup(body) {
    return requests.post("/auth/signup", body, {
      Accept: "*/*",
      "Content-Type": "multipart/form-data;",
    });
  },

  signupGuest(walletAddress) {
    return requests.post("/auth/signupGuest", { walletAddress });
  },

  authorize(body) {
    return requests.post("/auth/authorize", body);
  },

  hasAccount(walletAddress) {
    return requests.get(`/auth/hasAccount/${walletAddress}`);
  },

  me() {
    return requests.get("/auth/me");
  },
};

export default AuthServices;
