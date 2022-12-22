import requests from "./httpService";

const UserServices = {
  update(id, body) {
    return requests.patch(`/user/${id}`, body);
  },
};

export default UserServices;
