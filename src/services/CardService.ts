import axios from "axios";
import Card from "../interfaces/Card";

let api: string = process.env.REACT_APP_API + "/cards" || "";

export function addCard(newCard: Card, userId: number) {
  let card = { ...newCard, userId: userId };
  return axios.post(api, card);
}

export function getCardsByUserId(userId: number) {
  return axios.get(`${api}?userId=${userId}`);
}

export function getAllCards() {
  return axios.get(api);
}

export function getCardById(id: number) {
  return axios.get(`${api}/${id}`);
}

export function updateCard(card: Card, updateCardId: number) {
  return axios.put(`${api}/${updateCardId}`, card);
}

export function deleteCard(idToDelete: number) {
  return axios.delete(`${api}/${idToDelete}`);
}
