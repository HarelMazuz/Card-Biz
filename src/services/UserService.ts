import axios from "axios";
import User from "../interfaces/User";

let api: string = process.env.REACT_APP_API + "/users" || "";

export function checkUser(userToCheck: User) {
  return axios.get(
    `${api}?email=${userToCheck.email}&password=${userToCheck.password}`
  );
}

export function createUser(userToCreate: User) {
  return axios.post(api, userToCreate);
}
